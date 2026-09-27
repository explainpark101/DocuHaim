var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
import { r as a, j as f, a as Ur, c as Gr, __tla as __tla_0 } from "./vendor-react-BDjpSibw.js";
import { M as Kr, r as Zr, s as Xr, a as Yr } from "./vendor-markdown-it-BSFfF5B5.js";
import { C as ye, d as Qr, h as Jr, i as eo, E as ce, a as It, k as to, b as ro, m as oo, c as no, s as so, e as $r, f as io, S as Ue, g as Tr, l as ao, j as Je, n as lo, p as co, o as ke, u as uo, r as mo, q as ho, H as Cr, t as z, R as fo, D as po, W as go } from "./vendor-codemirror-CmNIsAMQ.js";
let cc, ac, Wl, pc, gc;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a2, _b, _a3, _c, _d, _a4, _u, _g, _L, _b2, _M, _z, _v, _n2, _x, _o2, _r2, _e2, _c2, _m, _l2, _s2, _y, _i2, _w, _k, _h, _f, _$, _j, _d2, _H, _zr_instances, __fn, _I, _S, _P, _p, V_fn, _N, _O, _D, T_fn, C_fn, q_fn, R_fn, F_fn, t_fn, W_fn, A_fn, E_fn, B_fn, _e3;
  const bo = (t, e = 200) => {
    let o = 0;
    return (...n) => new Promise((s) => {
      o && (clearTimeout(o), s("cancel")), o = window.setTimeout(() => {
        t.apply(void 0, n), o = 0, s("done");
      }, e);
    });
  }, vo = (t, e = {
    _blank: true,
    nofollow: true
  }) => {
    const o = document.createElement("a");
    o.href = t, e._blank && (o.target = "_blank"), e.nofollow && (o.rel = "noopener noreferrer"), o.click();
  }, $t = () => {
    let t = -1;
    return (e, o, n, s = 100) => {
      const r = () => {
        n && (typeof s == "number" ? setTimeout(n, s) : n());
      };
      t !== -1 && (cancelAnimationFrame(t), r());
      let i = e.scrollTop;
      const l = () => {
        t = -1;
        const d = o - i;
        i = i + d / 5, Math.abs(d) < 1 ? (e.scrollTo(0, o), r()) : (e.scrollTo(0, i), t = requestAnimationFrame(l));
      };
      t = requestAnimationFrame(l);
    };
  }, xo = (t) => {
    const e = (o) => {
      const { scrollHeight: n, scrollWidth: s, offsetHeight: r, offsetWidth: i, scrollLeft: l, scrollTop: d } = t, u = o.x, p = o.y, c = (g) => {
        const b = d + p - g.y, x = l + u - g.x, v = n - r, w = s - i, y = {};
        x >= 0 && x <= w && (y.left = x), b >= 0 && b <= v && (y.top = b), t.scroll(y);
      };
      document.addEventListener("mousemove", c);
      const h = () => {
        document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", h);
      };
      document.addEventListener("mouseup", h);
    };
    return t.addEventListener("mousedown", e), () => {
      t.removeEventListener("mousedown", e);
    };
  }, ct = () => `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`, Ge = (t) => t !== null && typeof t == "object" && !Array.isArray(t), Tt = (t, e, o = {}) => {
    if (Array.isArray(t) && Array.isArray(e)) return dt(t, e, o);
    const { excludeKeys: n } = o;
    for (const s in e) {
      const r = e[s], i = t[s];
      n && n(s) ? t[s] = r : Array.isArray(r) && Array.isArray(i) ? t[s] = dt(i, r, o) : Ge(r) && Ge(i) ? t[s] = Tt(i, r, o) : t[s] = r;
    }
    return t;
  }, dt = (t, e, o) => {
    const n = t.slice();
    return e.forEach((s, r) => {
      const i = n[r];
      Array.isArray(s) && Array.isArray(i) ? n[r] = dt(i, s, o) : Ge(s) && Ge(i) ? n[r] = Tt(i, s, o) : n[r] = s;
    }), n;
  }, m = "md-editor", Y = "https://unpkg.com", yo = `${Y}/@highlightjs/cdn-assets@11.10.0/highlight.min.js`, Nt = {
    main: `${Y}/prettier@3.3.3/standalone.js`,
    markdown: `${Y}/prettier@3.3.3/plugins/markdown.js`
  }, wo = {
    css: `${Y}/cropperjs@1.6.2/dist/cropper.min.css`,
    js: `${Y}/cropperjs@1.6.2/dist/cropper.min.js`
  }, ko = `${Y}/screenfull@5.2.0/dist/screenfull.js`, $o = `${Y}/mermaid@11.9.0/dist/mermaid.min.js`, To = {
    js: `${Y}/katex@0.16.22/dist/katex.min.js`,
    css: `${Y}/katex@0.16.22/dist/katex.min.css`
  }, ut = {
    a11y: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/a11y-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/a11y-dark.min.css`
    },
    atom: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-dark.min.css`
    },
    github: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/github.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/github-dark.min.css`
    },
    gradient: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/gradient-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/gradient-dark.min.css`
    },
    kimbie: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-dark.min.css`
    },
    paraiso: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-dark.min.css`
    },
    qtcreator: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-dark.min.css`
    },
    stackoverflow: {
      light: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-light.min.css`,
      dark: `${Y}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-dark.min.css`
    }
  }, Co = `${Y}/echarts@6.0.0/dist/echarts.min.js`, Eo = {
    highlight: {
      js: {
        integrity: "sha384-GdEWAbCjn+ghjX0gLx7/N1hyTVmPAjdC2OvoAA0RyNcAOhqwtT8qnbCxWle2+uJX",
        crossOrigin: "anonymous"
      },
      css: {
        a11y: {
          light: {
            integrity: "sha384-qdZDAN3jffvh670RHw1wxLekabidEFaNRninYgIzBvMbL6WlHdXeHS/Bt+vx33lN",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-2QAAjX8pqaM5azX68KWI2wExF6Q13kY4kEiQFY4b/1zPe6rpgmTByNpDEllH3sb+",
            crossOrigin: "anonymous"
          }
        },
        atom: {
          light: {
            integrity: "sha384-w6Ujm1VWa9HYFqGc89oAPn/DWDi2gUamjNrq9DRvEYm2X3ClItg9Y9xs1ViVo5b5",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-oaMLBGEzBOJx3UHwac0cVndtX5fxGQIfnAeFZ35RTgqPcYlbprH9o9PUV/F8Le07",
            crossOrigin: "anonymous"
          }
        },
        github: {
          light: {
            integrity: "sha384-eFTL69TLRZTkNfYZOLM+G04821K1qZao/4QLJbet1pP4tcF+fdXq/9CdqAbWRl/L",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-wH75j6z1lH97ZOpMOInqhgKzFkAInZPPSPlZpYKYTOqsaizPvhQZmAtLcPKXpLyH",
            crossOrigin: "anonymous"
          }
        },
        gradient: {
          light: {
            integrity: "sha384-yErHBR8aEZPxRl3XmR8dGSRAclMlnSRRw8sXQLcmPWzWUvb56BzQmBw3EWHl7QGI",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-lUCvtSOdvDbp5hLWKgwz/taFu1HxlpqES2OVP5UG2JMTfnU481gXcBhGF9lAGoSr",
            crossOrigin: "anonymous"
          }
        },
        kimbie: {
          light: {
            integrity: "sha384-tloeSLUPczAvoZ48TUz+OxRie0oYLCRwlkadUXovGzzJEIbNQB2TkfUuvJ6SW5Mi",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-o5F1vUaMNOmou1sQrsWiFo4/QUGSV0svqNZW+EesmKxWC8MpFJcveBhAyfvTHbGb",
            crossOrigin: "anonymous"
          }
        },
        paraiso: {
          light: {
            integrity: "sha384-5j6QHU2Hwg1ehtlIQNDebhETDB8bga3/88hzBFsMRaGmgQHCftqIN7GZNDNw0vTL",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-I5vnnMQu0LWDQnHpT61xyoMwKarAB8jpZkB2ioFOlmzUFnIFaV4QbUwlBBOMKhTH",
            crossOrigin: "anonymous"
          }
        },
        qtcreator: {
          light: {
            integrity: "sha384-iEBgHrwi8Hv4dSZBz+MOGvS05rF7I7fGKM2fASQyE9jn2Istg9Qd5dSoK18WyRTB",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-D6LXJGWNR4QV7gnpuP3ccbvOYoR02td3cU0y7lESABPg/tzCSC4m+y+M2TtrmpHc",
            crossOrigin: "anonymous"
          }
        },
        stackoverflow: {
          light: {
            integrity: "sha384-FMwt7cTGo4aLxZnno5k0xTj0W4gmi48Kwept+y/oQmE6cFk36Kr+QJZOKNOQwORe",
            crossOrigin: "anonymous"
          },
          dark: {
            integrity: "sha384-iL+x+BroCyHm/p2c6sMA9umXhdCWp2cKe4QUjPeMzHgwXAk+ZxHyIGP3NZTZensU",
            crossOrigin: "anonymous"
          }
        }
      }
    },
    prettier: {
      standaloneJs: {
        integrity: "sha384-92h6ALm8/lHpNGn6MfGlgZ+I8c/4yn/nSN8dV9ZmDxqbP9L93gk/Jj2i0LtV+AVd",
        crossOrigin: "anonymous"
      },
      parserMarkdownJs: {
        integrity: "sha384-5ufuUgoSsr/2oihBZ5d+c+yt0qaUmzLtUz41VZNJ4txtyJ6mBve3ZwuKoq/IygYX",
        crossOrigin: "anonymous"
      }
    },
    cropper: {
      js: {
        integrity: "sha384-jrOgQzBlDeUNdmQn3rUt/PZD+pdcRBdWd/HWRqRo+n2OR2QtGyjSaJC0GiCeH+ir",
        crossOrigin: "anonymous"
      },
      css: {
        integrity: "sha384-6LFfkTKLRlzFtgx8xsWyBdKGpcMMQTkv+dB7rAbugeJAu1Ym2q1Aji1cjHBG12Xh",
        crossOrigin: "anonymous"
      }
    },
    screenfull: {
      js: {
        integrity: "sha384-Qfbv8upMDu/ikv42M0Jnym2hahbDQ77Nm8PGU0G+iA6UIwt1+scE6P1qKXA0anWU",
        crossOrigin: "anonymous"
      }
    },
    mermaid: {
      js: {
        integrity: "sha384-UzWEhMP22MxNnr2bzqAdmtf1FDy5iKDUq6hLXJFLqC7dfGkc6W/hshbx9m71zyt5",
        crossOrigin: "anonymous"
      }
    },
    katex: {
      js: {
        integrity: "sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6",
        crossOrigin: "anonymous"
      },
      css: {
        integrity: "sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP",
        crossOrigin: "anonymous"
      }
    },
    echarts: {
      js: {
        integrity: "sha384-F07Cpw5v8spSU0H113F33m2NQQ/o6GqPTnTjf45ssG4Q6q58ZwhxBiQtIaqvnSpR",
        crossOrigin: "anonymous"
      }
    }
  }, Ct = [
    "bold",
    "underline",
    "italic",
    "strikeThrough",
    "-",
    "title",
    "sub",
    "sup",
    "quote",
    "unorderedList",
    "orderedList",
    "task",
    "-",
    "codeRow",
    "code",
    "link",
    "image",
    "table",
    "mermaid",
    "katex",
    "-",
    "revoke",
    "next",
    "save",
    "=",
    "prettier",
    "pageFullscreen",
    "fullscreen",
    "preview",
    "previewOnly",
    "htmlPreview",
    "catalog",
    "github"
  ], Et = [
    "markdownTotal",
    "=",
    "scrollSwitch"
  ], He = {
    "zh-CN": {
      toolbarTips: {
        bold: "\u52A0\u7C97",
        underline: "\u4E0B\u5212\u7EBF",
        italic: "\u659C\u4F53",
        strikeThrough: "\u5220\u9664\u7EBF",
        title: "\u6807\u9898",
        sub: "\u4E0B\u6807",
        sup: "\u4E0A\u6807",
        quote: "\u5F15\u7528",
        unorderedList: "\u65E0\u5E8F\u5217\u8868",
        orderedList: "\u6709\u5E8F\u5217\u8868",
        task: "\u4EFB\u52A1\u5217\u8868",
        codeRow: "\u884C\u5185\u4EE3\u7801",
        code: "\u5757\u7EA7\u4EE3\u7801",
        link: "\u94FE\u63A5",
        image: "\u56FE\u7247",
        table: "\u8868\u683C",
        mermaid: "mermaid\u56FE",
        katex: "katex\u516C\u5F0F",
        revoke: "\u540E\u9000",
        next: "\u524D\u8FDB",
        save: "\u4FDD\u5B58",
        prettier: "\u7F8E\u5316",
        pageFullscreen: "\u6D4F\u89C8\u5668\u5168\u5C4F",
        fullscreen: "\u5C4F\u5E55\u5168\u5C4F",
        preview: "\u9884\u89C8",
        previewOnly: "\u4EC5\u9884\u89C8",
        htmlPreview: "html\u4EE3\u7801\u9884\u89C8",
        catalog: "\u76EE\u5F55",
        github: "\u6E90\u7801\u5730\u5740"
      },
      titleItem: {
        h1: "\u4E00\u7EA7\u6807\u9898",
        h2: "\u4E8C\u7EA7\u6807\u9898",
        h3: "\u4E09\u7EA7\u6807\u9898",
        h4: "\u56DB\u7EA7\u6807\u9898",
        h5: "\u4E94\u7EA7\u6807\u9898",
        h6: "\u516D\u7EA7\u6807\u9898"
      },
      imgTitleItem: {
        link: "\u6DFB\u52A0\u94FE\u63A5",
        upload: "\u4E0A\u4F20\u56FE\u7247",
        clip2upload: "\u88C1\u526A\u4E0A\u4F20"
      },
      linkModalTips: {
        linkTitle: "\u6DFB\u52A0\u94FE\u63A5",
        imageTitle: "\u6DFB\u52A0\u56FE\u7247",
        descLabel: "\u94FE\u63A5\u63CF\u8FF0\uFF1A",
        descLabelPlaceHolder: "\u8BF7\u8F93\u5165\u63CF\u8FF0...",
        urlLabel: "\u94FE\u63A5\u5730\u5740\uFF1A",
        urlLabelPlaceHolder: "\u8BF7\u8F93\u5165\u94FE\u63A5...",
        buttonOK: "\u786E\u5B9A"
      },
      clipModalTips: {
        title: "\u88C1\u526A\u56FE\u7247\u4E0A\u4F20",
        buttonUpload: "\u4E0A\u4F20"
      },
      copyCode: {
        text: "\u590D\u5236\u4EE3\u7801",
        successTips: "\u5DF2\u590D\u5236\uFF01",
        failTips: "\u590D\u5236\u5931\u8D25\uFF01"
      },
      mermaid: {
        flow: "\u6D41\u7A0B\u56FE",
        sequence: "\u65F6\u5E8F\u56FE",
        gantt: "\u7518\u7279\u56FE",
        class: "\u7C7B\u56FE",
        state: "\u72B6\u6001\u56FE",
        pie: "\u997C\u56FE",
        relationship: "\u5173\u7CFB\u56FE",
        journey: "\u65C5\u7A0B\u56FE"
      },
      katex: {
        inline: "\u884C\u5185\u516C\u5F0F",
        block: "\u5757\u7EA7\u516C\u5F0F"
      },
      footer: {
        markdownTotal: "\u5B57\u6570",
        scrollAuto: "\u540C\u6B65\u6EDA\u52A8"
      }
    },
    "en-US": {
      toolbarTips: {
        bold: "bold",
        underline: "underline",
        italic: "italic",
        strikeThrough: "strikeThrough",
        title: "title",
        sub: "subscript",
        sup: "superscript",
        quote: "quote",
        unorderedList: "unordered list",
        orderedList: "ordered list",
        task: "task list",
        codeRow: "inline code",
        code: "block-level code",
        link: "link",
        image: "image",
        table: "table",
        mermaid: "mermaid",
        katex: "formula",
        revoke: "revoke",
        next: "undo revoke",
        save: "save",
        prettier: "prettier",
        pageFullscreen: "fullscreen in page",
        fullscreen: "fullscreen",
        preview: "preview",
        previewOnly: "preview only",
        htmlPreview: "html preview",
        catalog: "catalog",
        github: "source code"
      },
      titleItem: {
        h1: "Lv1 Heading",
        h2: "Lv2 Heading",
        h3: "Lv3 Heading",
        h4: "Lv4 Heading",
        h5: "Lv5 Heading",
        h6: "Lv6 Heading"
      },
      imgTitleItem: {
        link: "Add Image Link",
        upload: "Upload Images",
        clip2upload: "Crop And Upload"
      },
      linkModalTips: {
        linkTitle: "Add Link",
        imageTitle: "Add Image",
        descLabel: "Desc:",
        descLabelPlaceHolder: "Enter a description...",
        urlLabel: "Link:",
        urlLabelPlaceHolder: "Enter a link...",
        buttonOK: "OK"
      },
      clipModalTips: {
        title: "Crop Image",
        buttonUpload: "Upload"
      },
      copyCode: {
        text: "Copy",
        successTips: "Copied!",
        failTips: "Copy failed!"
      },
      mermaid: {
        flow: "flow",
        sequence: "sequence",
        gantt: "gantt",
        class: "class",
        state: "state",
        pie: "pie",
        relationship: "relationship",
        journey: "journey"
      },
      katex: {
        inline: "inline",
        block: "block"
      },
      footer: {
        markdownTotal: "Character Count",
        scrollAuto: "Scroll Auto"
      }
    }
  }, _ = {
    modelValue: "",
    theme: "light",
    className: "",
    onChange: () => {
    },
    pageFullscreen: false,
    preview: true,
    htmlPreview: false,
    language: "zh-CN",
    toolbars: Ct,
    toolbarsExclude: [],
    noPrettier: false,
    onHtmlChanged: () => {
    },
    onGetCatalog: () => {
    },
    tabWidth: 2,
    showCodeRowNumber: true,
    previewTheme: "default",
    mdHeadingId: (({ text: t }) => t),
    tableShape: [
      6,
      4
    ],
    noMermaid: false,
    sanitize: (t) => t,
    placeholder: "",
    noKatex: false,
    defToolbars: [],
    onError: () => {
    },
    codeTheme: "atom",
    footers: Et,
    defFooters: [],
    noUploadImg: false,
    codeStyleReverse: true,
    codeStyleReverseList: [
      "default",
      "mk-cute"
    ],
    noHighlight: false,
    noImgZoomIn: false,
    inputBoxWidth: "50%",
    sanitizeMermaid: (t) => Promise.resolve(t),
    transformImgUrl: (t) => t,
    codeFoldable: true,
    autoFoldThreshold: 30,
    catalogLayout: "fixed",
    floatingToolbars: [],
    customIcon: {}
  }, Q = {
    editorExtensions: {
      highlight: {
        js: yo,
        css: ut
      },
      prettier: {
        standaloneJs: Nt.main,
        parserMarkdownJs: Nt.markdown
      },
      cropper: {
        ...wo
      },
      screenfull: {
        js: ko
      },
      mermaid: {
        js: $o,
        enableZoom: true
      },
      katex: {
        ...To
      },
      echarts: {
        js: Co
      }
    },
    editorExtensionsAttrs: {},
    editorConfig: {
      languageUserDefined: {},
      mermaidTemplate: {},
      renderDelay: 500,
      zIndex: 2e4
    },
    codeMirrorExtensions: (t) => t,
    markdownItConfig: () => {
    },
    markdownItPlugins: (t) => t,
    mermaidConfig: (t) => t,
    katexConfig: (t) => t,
    echartsConfig: (t) => t
  }, So = (t) => Tt(Q, t, {
    excludeKeys(e) {
      return /[iI]{1}nstance/.test(e);
    }
  }), _e = 0.1, jo = (t, e = "image.png") => {
    const o = t.split(","), n = o[0].match(/:(.*?);/);
    if (n) {
      const s = n[1], r = atob(o[1]);
      let i = r.length;
      const l = new Uint8Array(i);
      for (; i--; ) l[i] = r.charCodeAt(i);
      return new File([
        l
      ], e, {
        type: s
      });
    }
    return null;
  }, Lo = (t, e) => {
    if (!t) return t;
    const o = e.split(`
`), n = [
      '<span rn-wrapper aria-hidden="true">'
    ];
    return o.forEach(() => {
      n.push("<span></span>");
    }), n.push("</span>"), `<span class="${m}-code-block">${t}</span>${n.join("")}`;
  }, B = (t) => t.filter(Boolean).join(" "), Io = (t, e) => {
    if (!t || !e) return 0;
    const o = t == null ? void 0 : t.getBoundingClientRect();
    if (e === document.documentElement) return o.top - e.clientTop;
    const n = e == null ? void 0 : e.getBoundingClientRect();
    return o.top - n.top;
  }, At = /* @__PURE__ */ (() => {
    let t = 0;
    return () => ++t;
  })(), Er = {
    editorId: "",
    tabWidth: 2,
    theme: "light",
    language: "zh-CN",
    highlight: {
      css: "",
      js: ""
    },
    showCodeRowNumber: false,
    usedLanguageText: He["zh-CN"],
    previewTheme: "default",
    customIcon: {},
    rootRef: null,
    disabled: void 0,
    showToolbarName: false,
    setting: {
      preview: false,
      htmlPreview: false,
      previewOnly: false,
      pageFullscreen: false,
      fullscreen: false
    },
    updateSetting: () => {
    },
    tableShape: [
      6,
      4
    ],
    catalogVisible: false,
    noUploadImg: false,
    noPrettier: false,
    codeTheme: "default",
    defToolbars: [],
    floatingToolbars: []
  }, D = a.createContext(Er), Oe = "onSave", Ke = "changeCatalogVisible", mt = "changeFullscreen", Mt = "pageFullscreenChanged", zt = "fullscreenChanged", Ht = "previewChanged", Ot = "previewOnlyChanged", Rt = "htmlPreviewChanged", Ft = "catalogVisibleChanged", Le = "buildFinished", he = "errorCatcher", q = "replace", Re = "uploadImage", ht = "ctrlZ", ft = "ctrlShiftZ", Me = "catalogChanged", pt = "pushCatalog", Ze = "rerender", gt = "eventListener", bt = "taskStateChanged", vt = "sendEditorView", Xe = "getEditorView";
  let No = class {
    constructor() {
      __publicField(this, "pools", {});
    }
    remove(e, o, n) {
      const s = this.pools[e] && this.pools[e][o];
      s && (this.pools[e][o] = s.filter((r) => r !== n));
    }
    clear(e) {
      this.pools[e] = {};
    }
    on(e, o) {
      return this.pools[e] || (this.pools[e] = {}), this.pools[e][o.name] || (this.pools[e][o.name] = []), this.pools[e][o.name].push(o.callback), this.pools[e][o.name].includes(o.callback);
    }
    emit(e, o, ...n) {
      this.pools[e] || (this.pools[e] = {});
      const s = this.pools[e][o];
      s && s.forEach((r) => {
        try {
          r(...n);
        } catch (i) {
          console.error(`${o} monitor event exception\uFF01`, i);
        }
      });
    }
  };
  const E = new No(), Ao = `.${m}-preview > [data-line]`, Ee = (t, e) => +getComputedStyle(t).getPropertyValue(e).replace("px", ""), Mo = (t, e) => {
    const o = bo(() => {
      t.removeEventListener("scroll", n), t.addEventListener("scroll", n), e.removeEventListener("scroll", n), e.addEventListener("scroll", n);
    }, 50), n = (s) => {
      const r = t.clientHeight, i = e.clientHeight, l = t.scrollHeight, d = e.scrollHeight, u = (l - r) / (d - i);
      s.target === t ? (e.removeEventListener("scroll", n), e.scrollTo({
        top: t.scrollTop / u
      }), o()) : (t.removeEventListener("scroll", n), t.scrollTo({
        top: e.scrollTop * u
      }), o());
    };
    return [
      () => {
        o().finally(() => {
          t.dispatchEvent(new Event("scroll"));
        });
      },
      () => {
        t.removeEventListener("scroll", n), e.removeEventListener("scroll", n);
      }
    ];
  }, zo = (t, e, o) => {
    const { view: n } = o, s = $t(), r = (w) => n.lineBlockAt(n.state.doc.line(w + 1).from).top, i = (w) => n.lineBlockAt(n.state.doc.line(w + 1).from).bottom;
    let l = [], d = [], u = [];
    const p = () => {
      l = [], d = Array.from(e.querySelectorAll(Ao)), u = d.map((C) => Number(C.dataset.line));
      const w = [
        ...u
      ], { lines: y } = n.state.doc;
      let T = w.shift() || 0, k = w.shift() || y;
      for (let C = 0; C < y; C++) C === k && (T = C, k = w.shift() || y), l.push({
        start: T,
        end: k - 1
      });
    }, c = (w, y) => {
      let T = 1;
      for (let k = d.length - 1; k - 1 >= 0; k--) {
        const C = d[k], I = d[k - 1];
        if (C.offsetTop + C.offsetHeight > y && I.offsetTop < y) {
          T = Number(I.dataset.line);
          break;
        }
      }
      for (let k = l.length - 1; k >= 0; k--) {
        const C = i(l[k].end), I = r(l[k].start);
        if (C > w && I <= w) {
          T = T < l[k].start ? T : l[k].start;
          break;
        }
      }
      return T;
    };
    let h = 0, g = 0;
    const b = () => {
      var _a5, _b3, _c3;
      if (g !== 0) return false;
      h++;
      const { scrollDOM: w, contentHeight: y } = n;
      let T = Ee(e, "padding-block-start");
      const k = n.lineBlockAtHeight(w.scrollTop), { number: C } = n.state.doc.lineAt(k.from), I = l[C - 1];
      if (!I) return false;
      let N = 1;
      const $ = e.querySelector(`[data-line="${I.start}"]`) || ((_a5 = e.firstElementChild) == null ? void 0 : _a5.firstElementChild), S = e.querySelector(`[data-line="${I.end + 1}"]`) || ((_b3 = e.lastElementChild) == null ? void 0 : _b3.lastElementChild), O = w.scrollHeight - w.clientHeight, R = e.scrollHeight - e.clientHeight;
      let A = r(I.start), H = i(I.end), F = $.offsetTop, P = S.offsetTop - F;
      A === 0 && (F = 0, $ === S ? (T = 0, H = y - w.offsetHeight, P = R) : P = S.offsetTop), N = (w.scrollTop - A) / (H - A);
      const j = S == ((_c3 = e.lastElementChild) == null ? void 0 : _c3.lastElementChild) ? S.offsetTop + S.clientHeight : S.offsetTop;
      if (H >= O || j > R) {
        const L = c(O, R);
        A = r(L), N = (w.scrollTop - A) / (O - A);
        const W = e.querySelector(`[data-line="${L}"]`);
        A > 0 && W && (F = W.offsetTop), P = R - F + Ee(e, "padding-block-start");
      }
      const M = F - T + P * N;
      s(e, M, () => {
        h--;
      });
    }, x = () => {
      var _a5, _b3, _c3, _d3, _e4, _f2;
      if (h !== 0) return;
      g++;
      const { scrollDOM: w } = n, y = e.scrollTop, T = e.scrollHeight, k = w.scrollHeight - w.clientHeight, C = e.scrollHeight - e.clientHeight;
      let I = (_a5 = e.firstElementChild) == null ? void 0 : _a5.firstElementChild, N = (_b3 = e.firstElementChild) == null ? void 0 : _b3.lastElementChild;
      if (u.length > 0) {
        let j = Math.ceil(u[u.length - 1] * (y / T)), M = u.findLastIndex((L) => L <= j);
        M = M === -1 ? 0 : M, j = u[M];
        for (let L = M; L >= 0 && L < u.length; ) if (d[L].offsetTop > y) {
          if (L - 1 >= 0) {
            L--;
            continue;
          }
          j = -1, M = L;
          break;
        } else {
          if (L + 1 < u.length && d[L + 1].offsetTop < y) {
            L++;
            continue;
          }
          j = u[L], M = L;
          break;
        }
        switch (M) {
          case -1: {
            I = (_c3 = e.firstElementChild) == null ? void 0 : _c3.firstElementChild, N = d[M];
            break;
          }
          case u.length - 1: {
            I = d[M], N = (_d3 = e.firstElementChild) == null ? void 0 : _d3.lastElementChild;
            break;
          }
          default:
            I = d[M], N = d[M + 1 === d.length ? M : M + 1];
        }
      }
      let $ = I === ((_e4 = e.firstElementChild) == null ? void 0 : _e4.firstElementChild) ? 0 : I.offsetTop - Ee(I, "margin-block-start"), S = N.offsetTop, O = 0;
      const { start: R, end: A } = l[Number(I.dataset.line || 0)];
      let H = r(R);
      const F = r(A + 1 === n.state.doc.lines ? A : A + 1);
      let P = 0;
      if (F > k || N.offsetTop + N.offsetHeight > C) {
        const j = c(k, C), M = e.querySelector(`[data-line="${j}"]`);
        $ = M ? M.offsetTop - Ee(M, "margin-block-start") : $, H = r(j), O = (y - $) / (C - $), P = k - H;
      } else I === ((_f2 = e.firstElementChild) == null ? void 0 : _f2.firstElementChild) ? (I === N && (S = N.offsetTop + N.offsetHeight + +getComputedStyle(N).marginBlockEnd.replace("px", "")), P = F, O = Math.max(y / S, 0)) : (O = Math.max((y - $) / (S - $), 0), P = F - H);
      s(t, H + P * O, () => {
        g--;
      });
    }, v = (w) => {
      var _a5;
      const { scrollDOM: y, contentHeight: T } = n, k = y.clientHeight;
      if (T <= k || e.firstElementChild.clientHeight <= e.clientHeight || n.state.doc.lines <= ((_a5 = l[l.length - 1]) == null ? void 0 : _a5.end)) return false;
      w.target === t ? b() : x();
    };
    return [
      () => {
        p(), t.addEventListener("scroll", v), e.addEventListener("scroll", v), t.dispatchEvent(new Event("scroll"));
      },
      () => {
        t.removeEventListener("scroll", v), e.removeEventListener("scroll", v);
      }
    ];
  }, Sr = a.createContext({
    scrollElementRef: void 0,
    rootNodeRef: void 0
  }), jr = ({ tocItem: t, mdHeadingId: e, onActive: o, onClick: n, scrollElementOffsetTop: s = 0 }) => {
    const { scrollElementRef: r, rootNodeRef: i } = a.useContext(Sr), l = a.useRef(null);
    return a.useEffect(() => {
      t.active && o(t, l.current);
    }, [
      o,
      t,
      t.active
    ]), f.jsxs("div", {
      ref: l,
      className: B([
        `${m}-catalog-link`,
        t.active && `${m}-catalog-active`
      ]),
      onClick: (d) => {
        if (d.stopPropagation(), n == null ? void 0 : n(d, t), d.defaultPrevented) return;
        const u = e({
          text: t.text,
          level: t.level,
          index: t.index,
          currentToken: t.currentToken,
          nextToken: t.nextToken
        }), p = i == null ? void 0 : i.current.getElementById(u), c = r == null ? void 0 : r.current;
        if (p && c) {
          let h = p.offsetParent, g = p.offsetTop;
          if (c.contains(h)) for (; h && c != h; ) g += h == null ? void 0 : h.offsetTop, h = h == null ? void 0 : h.offsetParent;
          const b = p.previousElementSibling;
          let x = 0;
          b || (x = Ee(p, "margin-block-start")), c == null ? void 0 : c.scrollTo({
            top: g - s - x,
            behavior: "smooth"
          });
        }
      },
      children: [
        f.jsx("span", {
          title: t.text,
          children: t.text
        }),
        t.children && t.children.length > 0 && f.jsx("div", {
          className: `${m}-catalog-wrapper`,
          children: t.children.map((d) => f.jsx(jr, {
            mdHeadingId: e,
            tocItem: d,
            onActive: o,
            onClick: n,
            scrollElementOffsetTop: s
          }, `${t.text}-link-${d.level}-${d.text}`))
        })
      ]
    });
  }, Ho = a.memo(jr), Oo = (t) => {
    const { editorId: e, mdHeadingId: o = _.mdHeadingId, theme: n = "light", offsetTop: s = 20, syncWith: r = "preview", catalogMaxDepth: i } = t, l = a.useMemo(() => `#${e}-preview-wrapper`, [
      e
    ]), [d, u] = a.useState([]), [p, c] = a.useState(), h = a.useRef(null), g = a.useRef(null), b = a.useRef(void 0), x = a.useRef(null), [v, w] = a.useState(), [y, T] = a.useState({}), k = a.useMemo(() => {
      const S = [];
      return d.forEach((O, R) => {
        if (i && O.level > i) return;
        const { text: A, level: H, line: F } = O, P = {
          level: H,
          text: A,
          line: F,
          index: R + 1,
          active: p === O
        };
        if (S.length === 0) S.push(P);
        else {
          let j = S[S.length - 1];
          if (P.level > j.level) for (let M = j.level + 1; M <= 6; M++) {
            const { children: L } = j;
            if (!L) {
              j.children = [
                P
              ];
              break;
            }
            if (j = L[L.length - 1], P.level <= j.level) {
              L.push(P);
              break;
            }
          }
          else S.push(P);
        }
      }), S;
    }, [
      p,
      d,
      i
    ]), [C] = a.useState(() => t.scrollElement || `#${e}-preview-wrapper`), I = a.useCallback(() => {
      var _a5;
      if (C instanceof HTMLElement) return C;
      let S = document;
      return (C === l || t.isScrollElementInShadow) && (S = (_a5 = h.current) == null ? void 0 : _a5.getRootNode()), S.querySelector(C);
    }, [
      l,
      t.isScrollElementInShadow,
      C
    ]), N = a.useCallback((S, O) => {
      var _a5;
      T({
        top: O.offsetTop + Ee(O, "padding-block-start") + "px"
      }), (_a5 = t.onActive) == null ? void 0 : _a5.call(t, S, O);
    }, [
      t
    ]);
    a.useEffect(() => {
      x.current = h.current.getRootNode();
    }, []), a.useEffect(() => {
      let S = [];
      const O = (H) => {
        if (H.length === 0) return c(void 0), u([]), S = H, false;
        const { activeHead: F, activeIndex: P } = H.reduce((M, L, W) => {
          var _a5;
          let V = 0;
          if (r === "preview") {
            const X = (_a5 = x.current) == null ? void 0 : _a5.getElementById(o({
              text: L.text,
              level: L.level,
              index: W + 1,
              currentToken: L.currentToken,
              nextToken: L.nextToken
            }));
            X instanceof HTMLElement && (V = Io(X, g.current));
          } else if (v) {
            const X = v.lineBlockAt(v.state.doc.line(L.line + 1).from).top, J = v.scrollDOM.scrollTop;
            V = X - J;
          }
          return V < s && V > M.minTop ? {
            activeHead: L,
            activeIndex: W,
            minTop: V
          } : M;
        }, {
          activeHead: H[0],
          activeIndex: 0,
          minTop: Number.MIN_SAFE_INTEGER
        });
        let j = F;
        if (i && j.level > i) {
          for (let M = P; M >= 0; M--) {
            const L = H[M];
            if (L.level <= i) {
              j = L;
              break;
            }
          }
          if (j.level > i) {
            const M = H.find((L) => L.level <= i);
            M && (j = M);
          }
        }
        c(j), u(H), S = H;
      }, R = () => {
        O(S);
      }, A = (H) => {
        var _a5, _b3;
        if ((_a5 = b.current) == null ? void 0 : _a5.removeEventListener("scroll", R), r === "editor") b.current = v == null ? void 0 : v.scrollDOM;
        else {
          const F = I();
          g.current = F, b.current = F === document.documentElement ? document : F;
        }
        O(H), (_b3 = b.current) == null ? void 0 : _b3.addEventListener("scroll", R);
      };
      return E.on(e, {
        name: Me,
        callback: A
      }), E.emit(e, pt), () => {
        var _a5;
        E.remove(e, Me, A), (_a5 = b.current) == null ? void 0 : _a5.removeEventListener("scroll", R);
      };
    }, [
      s,
      o,
      I,
      e,
      r,
      v,
      i
    ]);
    const $ = a.useMemo(() => ({
      scrollElementRef: g,
      rootNodeRef: x
    }), []);
    return a.useEffect(() => {
      const S = (O) => {
        w(O);
      };
      return E.on(e, {
        name: Xe,
        callback: S
      }), E.emit(e, vt), () => {
        E.remove(e, Xe, S);
      };
    }, [
      e
    ]), f.jsx(Sr.Provider, {
      value: $,
      children: f.jsx("div", {
        className: B([
          `${m}-catalog`,
          n === "dark" && `${m}-catalog-dark`,
          t.className || ""
        ]),
        style: t.style,
        ref: h,
        children: k.length > 0 && f.jsxs(f.Fragment, {
          children: [
            f.jsx("div", {
              className: `${m}-catalog-indicator`,
              style: y
            }),
            f.jsx("div", {
              className: `${m}-catalog-container`,
              children: k.map((S) => f.jsx(Ho, {
                mdHeadingId: o,
                tocItem: S,
                onActive: N,
                onClick: t.onClick,
                scrollElementOffsetTop: t.scrollElementOffsetTop
              }, `link-${S.level}-${S.text}`))
            })
          ]
        })
      })
    });
  }, Lr = a.memo(Oo);
  async function Ir(t) {
    if (typeof t == "string") {
      if (window.isSecureContext && navigator.clipboard) return await navigator.clipboard.writeText(t);
      {
        const e = document.createElement("textarea");
        let o = false;
        if (e.value = t, e.style.position = "fixed", e.style.opacity = 0, e.style.zIndex = "-10000", e.style.top = "-10000", document.body.appendChild(e), e.select(), o = document.execCommand("copy"), document.body.removeChild(e), o) return;
        throw new Error('Failed to copy content via "execCommand"!');
      }
    }
  }
  const Ro = {
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy ${m}-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    "collapse-tips": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-chevron-left ${m}-icon"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>`,
    pin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin ${m}-icon"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`,
    "pin-off": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin-off ${m}-icon"><path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check ${m}-icon"><path d="M20 6 9 17l-5-5"/></svg>`
  }, me = (t, e) => typeof e[t] == "string" ? e[t] : Ro[t], Fo = (t, e) => {
    const o = (n) => {
      const s = t.parentElement || document.body, r = s.offsetWidth, i = s.offsetHeight, { clientWidth: l, clientHeight: d } = document.documentElement, u = n.offsetX, p = n.offsetY, c = (g) => {
        let b = g.x + document.body.scrollLeft - document.body.clientLeft - u, x = g.y + document.body.scrollTop - document.body.clientTop - p;
        b = b < 1 ? 1 : b < l - r - 1 ? b : l - r - 1, x = x < 1 ? 1 : x < d - i - 1 ? x : d - i - 1, e ? e(b, x) : (s.style.left = b + "px", s.style.top = x + "px");
      };
      document.addEventListener("mousemove", c);
      const h = () => {
        document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", h);
      };
      document.addEventListener("mouseup", h);
    };
    return t.addEventListener("mousedown", o), () => {
      t.removeEventListener("mousedown", o);
    };
  }, ue = (t, e, o = "") => {
    var _a5;
    const n = document.getElementById(e.id);
    if (n) o !== "" && (Reflect.get(window, o) ? (_a5 = e.onload) == null ? void 0 : _a5.call(n, new Event("load")) : e.onload && n.addEventListener("load", e.onload));
    else {
      const s = {
        ...e
      };
      s.onload = null;
      const r = Po(t, s);
      e.onload && r.addEventListener("load", e.onload), document.head.appendChild(r);
    }
  }, _o = (t, e) => {
    var _a5;
    (_a5 = document.getElementById(e.id)) == null ? void 0 : _a5.remove(), ue(t, e);
  }, Po = (t, e) => {
    const o = document.createElement(t);
    return Object.keys(e).forEach((n) => {
      e[n] !== void 0 && (o[n] = e[n]);
    }), o;
  }, Do = (t, e) => {
    const o = /* @__PURE__ */ new Map();
    return t == null ? void 0 : t.forEach((n) => {
      let s = n.querySelector(`.${m}-mermaid-action`);
      s ? s.querySelector(`.${m}-mermaid-copy`) || s.insertAdjacentHTML("beforeend", `<span class="${m}-mermaid-copy">${me("copy", e.customIcon)}</span>`) : (n.insertAdjacentHTML("beforeend", `<div class="${m}-mermaid-action"><span class="${m}-mermaid-copy">${me("copy", e.customIcon)}</span></div>`), s = n.querySelector(`.${m}-mermaid-action`));
      const r = s.querySelector(`.${m}-mermaid-copy`);
      let i = -1;
      const l = () => {
        clearTimeout(i), Ir(n.dataset.content || "").then(() => {
          r.innerHTML = me("check", e.customIcon);
        }).catch(() => {
          r.innerHTML = me("copy", e.customIcon);
        }).finally(() => {
          i = window.setTimeout(() => {
            r.innerHTML = me("copy", e.customIcon);
          }, 1500);
        });
      };
      r.addEventListener("click", l), o.set(n, {
        removeClick: () => {
          r.removeEventListener("click", l);
        }
      });
    }), () => {
      o.forEach(({ removeClick: n }) => {
        n == null ? void 0 : n();
      }), o.clear();
    };
  }, qo = /* @__PURE__ */ (() => {
    const t = (e) => {
      if (!e) return () => {
      };
      const o = e.firstChild;
      let n = 1, s = 0, r = 0, i = false, l, d, u, p = 1;
      const c = () => {
        o.style.transform = `translate(${s}px, ${r}px) scale(${n})`;
      }, h = (k) => {
        k.touches.length === 1 ? (i = true, l = k.touches[0].clientX - s, d = k.touches[0].clientY - r) : k.touches.length === 2 && (u = Math.hypot(k.touches[0].clientX - k.touches[1].clientX, k.touches[0].clientY - k.touches[1].clientY), p = n);
      }, g = (k) => {
        if (k.preventDefault(), i && k.touches.length === 1) s = k.touches[0].clientX - l, r = k.touches[0].clientY - d, c();
        else if (k.touches.length === 2) {
          const C = Math.hypot(k.touches[0].clientX - k.touches[1].clientX, k.touches[0].clientY - k.touches[1].clientY) / u, I = n;
          n = p * (1 + (C - 1));
          const N = (k.touches[0].clientX + k.touches[1].clientX) / 2, $ = (k.touches[0].clientY + k.touches[1].clientY) / 2, S = o.getBoundingClientRect(), O = (N - S.left) / I, R = ($ - S.top) / I;
          s -= O * (n - I), r -= R * (n - I), c();
        }
      }, b = () => {
        i = false;
      }, x = (k) => {
        k.preventDefault();
        const C = 0.02, I = n;
        k.deltaY < 0 ? n += C : n = Math.max(0.1, n - C);
        const N = o.getBoundingClientRect(), $ = k.clientX - N.left, S = k.clientY - N.top;
        s -= $ / I * (n - I), r -= S / I * (n - I), c();
      }, v = (k) => {
        i = true, l = k.clientX - s, d = k.clientY - r;
      }, w = (k) => {
        i && (s = k.clientX - l, r = k.clientY - d, c());
      }, y = () => {
        i = false;
      }, T = () => {
        i = false;
      };
      return e.addEventListener("touchstart", h, {
        passive: false
      }), e.addEventListener("touchmove", g, {
        passive: false
      }), e.addEventListener("touchend", b), e.addEventListener("wheel", x, {
        passive: false
      }), e.addEventListener("mousedown", v), e.addEventListener("mousemove", w), e.addEventListener("mouseup", y), e.addEventListener("mouseleave", T), () => {
        e.removeEventListener("touchstart", h), e.removeEventListener("touchmove", g), e.removeEventListener("touchend", b), e.removeEventListener("wheel", x), e.removeEventListener("mousedown", v), e.removeEventListener("mousemove", w), e.removeEventListener("mouseup", y), e.removeEventListener("mouseleave", T);
      };
    };
    return (e, o) => {
      const n = /* @__PURE__ */ new Map();
      return e == null ? void 0 : e.forEach((s) => {
        let r = s.querySelector(`.${m}-mermaid-action`);
        r ? r.querySelector(`.${m}-mermaid-zoom`) || r.insertAdjacentHTML("beforeend", `<span class="${m}-mermaid-zoom">${me("pin-off", o.customIcon)}</span>`) : (s.insertAdjacentHTML("beforeend", `<div class="${m}-mermaid-action"><span class="${m}-mermaid-zoom">${me("pin-off", o.customIcon)}</span></div>`), r = s.querySelector(`.${m}-mermaid-action`));
        const i = r.querySelector(`.${m}-mermaid-zoom`), l = () => {
          const d = n.get(s);
          if (d == null ? void 0 : d.removeEvent) d.removeEvent(), s.removeAttribute("data-grab"), n.set(s, {
            removeClick: d.removeClick
          }), i.innerHTML = me("pin-off", o.customIcon);
          else {
            const u = t(s);
            s.setAttribute("data-grab", ""), n.set(s, {
              removeEvent: u,
              removeClick: d == null ? void 0 : d.removeClick
            }), i.innerHTML = me("pin", o.customIcon);
          }
        };
        i.addEventListener("click", l), n.set(s, {
          removeClick: () => i.removeEventListener("click", l)
        });
      }), () => {
        n.forEach(({ removeEvent: s, removeClick: r }) => {
          s == null ? void 0 : s(), r == null ? void 0 : r();
        }), n.clear();
      };
    };
  })();
  var Wo = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, Nr = /* @__PURE__ */ new Set(), xt = typeof process == "object" && process ? process : {}, Ar = (t, e, o, n) => {
    typeof xt.emitWarning == "function" ? xt.emitWarning(t, e, o, n) : console.error(`[${o}] ${e}: ${t}`);
  }, Ye = globalThis.AbortController, _t = globalThis.AbortSignal;
  if (typeof Ye > "u") {
    _t = class {
      constructor() {
        __publicField(this, "onabort");
        __publicField(this, "_onabort", []);
        __publicField(this, "reason");
        __publicField(this, "aborted", false);
      }
      addEventListener(o, n) {
        this._onabort.push(n);
      }
    }, Ye = class {
      constructor() {
        __publicField(this, "signal", new _t());
        e();
      }
      abort(o) {
        var _a5, _b3;
        if (!this.signal.aborted) {
          this.signal.reason = o, this.signal.aborted = true;
          for (let n of this.signal._onabort) n(o);
          (_b3 = (_a5 = this.signal).onabort) == null ? void 0 : _b3.call(_a5, o);
        }
      }
    };
    let t = ((_a2 = xt.env) == null ? void 0 : _a2.LRU_CACHE_IGNORE_AC_WARNING) !== "1", e = () => {
      t && (t = false, Ar("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", e));
    };
  }
  var Bo = (t) => !Nr.has(t), be = (t) => t && t === Math.floor(t) && t > 0 && isFinite(t), Mr = (t) => be(t) ? t <= Math.pow(2, 8) ? Uint8Array : t <= Math.pow(2, 16) ? Uint16Array : t <= Math.pow(2, 32) ? Uint32Array : t <= Number.MAX_SAFE_INTEGER ? We : null : null, We = class extends Array {
    constructor(e) {
      super(e), this.fill(0);
    }
  }, Vo = (_b = class {
    constructor(e, o) {
      __publicField(this, "heap");
      __publicField(this, "length");
      if (!__privateGet(_b, _a3)) throw new TypeError("instantiate Stack using Stack.create(n)");
      this.heap = new o(e), this.length = 0;
    }
    static create(e) {
      let o = Mr(e);
      if (!o) return [];
      __privateSet(_b, _a3, true);
      let n = new _b(e, o);
      return __privateSet(_b, _a3, false), n;
    }
    push(e) {
      this.heap[this.length++] = e;
    }
    pop() {
      return this.heap[--this.length];
    }
  }, _a3 = new WeakMap(), __privateAdd(_b, _a3, false), _b), Uo = (_e3 = class {
    constructor(e) {
      __privateAdd(this, _zr_instances);
      __privateAdd(this, _a4);
      __privateAdd(this, _u);
      __privateAdd(this, _g);
      __privateAdd(this, _L);
      __privateAdd(this, _b2);
      __privateAdd(this, _M);
      __privateAdd(this, _z);
      __privateAdd(this, _v);
      __publicField(this, "ttl");
      __publicField(this, "ttlResolution");
      __publicField(this, "ttlAutopurge");
      __publicField(this, "updateAgeOnGet");
      __publicField(this, "updateAgeOnHas");
      __publicField(this, "allowStale");
      __publicField(this, "noDisposeOnSet");
      __publicField(this, "noUpdateTTL");
      __publicField(this, "maxEntrySize");
      __publicField(this, "sizeCalculation");
      __publicField(this, "noDeleteOnFetchRejection");
      __publicField(this, "noDeleteOnStaleGet");
      __publicField(this, "allowStaleOnFetchAbort");
      __publicField(this, "allowStaleOnFetchRejection");
      __publicField(this, "ignoreFetchAbort");
      __privateAdd(this, _n2);
      __privateAdd(this, _x);
      __privateAdd(this, _o2);
      __privateAdd(this, _r2);
      __privateAdd(this, _e2);
      __privateAdd(this, _c2);
      __privateAdd(this, _m);
      __privateAdd(this, _l2);
      __privateAdd(this, _s2);
      __privateAdd(this, _y);
      __privateAdd(this, _i2);
      __privateAdd(this, _w);
      __privateAdd(this, _k);
      __privateAdd(this, _h);
      __privateAdd(this, _f);
      __privateAdd(this, _$);
      __privateAdd(this, _j);
      __privateAdd(this, _d2);
      __privateAdd(this, _H);
      __privateAdd(this, _I, () => {
      });
      __privateAdd(this, _S, () => {
      });
      __privateAdd(this, _P, () => {
      });
      __privateAdd(this, _p, () => false);
      __privateAdd(this, _N, (e) => {
      });
      __privateAdd(this, _O, (e, o, n) => {
      });
      __privateAdd(this, _D, (e, o, n, s) => {
        if (n || s) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        return 0;
      });
      __publicField(this, _c, "LRUCache");
      let { max: o = 0, ttl: n, ttlResolution: s = 1, ttlAutopurge: r, updateAgeOnGet: i, updateAgeOnHas: l, allowStale: d, dispose: u, onInsert: p, disposeAfter: c, noDisposeOnSet: h, noUpdateTTL: g, maxSize: b = 0, maxEntrySize: x = 0, sizeCalculation: v, fetchMethod: w, memoMethod: y, noDeleteOnFetchRejection: T, noDeleteOnStaleGet: k, allowStaleOnFetchRejection: C, allowStaleOnFetchAbort: I, ignoreFetchAbort: N, perf: $ } = e;
      if ($ !== void 0 && typeof ($ == null ? void 0 : $.now) != "function") throw new TypeError("perf option must have a now() method if specified");
      if (__privateSet(this, _v, $ ?? Wo), o !== 0 && !be(o)) throw new TypeError("max option must be a nonnegative integer");
      let S = o ? Mr(o) : Array;
      if (!S) throw new Error("invalid max value: " + o);
      if (__privateSet(this, _a4, o), __privateSet(this, _u, b), this.maxEntrySize = x || __privateGet(this, _u), this.sizeCalculation = v, this.sizeCalculation) {
        if (!__privateGet(this, _u) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
        if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
      }
      if (y !== void 0 && typeof y != "function") throw new TypeError("memoMethod must be a function if defined");
      if (__privateSet(this, _z, y), w !== void 0 && typeof w != "function") throw new TypeError("fetchMethod must be a function if specified");
      if (__privateSet(this, _M, w), __privateSet(this, _j, !!w), __privateSet(this, _o2, /* @__PURE__ */ new Map()), __privateSet(this, _r2, new Array(o).fill(void 0)), __privateSet(this, _e2, new Array(o).fill(void 0)), __privateSet(this, _c2, new S(o)), __privateSet(this, _m, new S(o)), __privateSet(this, _l2, 0), __privateSet(this, _s2, 0), __privateSet(this, _y, Vo.create(o)), __privateSet(this, _n2, 0), __privateSet(this, _x, 0), typeof u == "function" && __privateSet(this, _g, u), typeof p == "function" && __privateSet(this, _L, p), typeof c == "function" ? (__privateSet(this, _b2, c), __privateSet(this, _i2, [])) : (__privateSet(this, _b2, void 0), __privateSet(this, _i2, void 0)), __privateSet(this, _$, !!__privateGet(this, _g)), __privateSet(this, _H, !!__privateGet(this, _L)), __privateSet(this, _d2, !!__privateGet(this, _b2)), this.noDisposeOnSet = !!h, this.noUpdateTTL = !!g, this.noDeleteOnFetchRejection = !!T, this.allowStaleOnFetchRejection = !!C, this.allowStaleOnFetchAbort = !!I, this.ignoreFetchAbort = !!N, this.maxEntrySize !== 0) {
        if (__privateGet(this, _u) !== 0 && !be(__privateGet(this, _u))) throw new TypeError("maxSize must be a positive integer if specified");
        if (!be(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
        __privateMethod(this, _zr_instances, V_fn).call(this);
      }
      if (this.allowStale = !!d, this.noDeleteOnStaleGet = !!k, this.updateAgeOnGet = !!i, this.updateAgeOnHas = !!l, this.ttlResolution = be(s) || s === 0 ? s : 1, this.ttlAutopurge = !!r, this.ttl = n || 0, this.ttl) {
        if (!be(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
        __privateMethod(this, _zr_instances, __fn).call(this);
      }
      if (__privateGet(this, _a4) === 0 && this.ttl === 0 && __privateGet(this, _u) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
      if (!this.ttlAutopurge && !__privateGet(this, _a4) && !__privateGet(this, _u)) {
        let O = "LRU_CACHE_UNBOUNDED";
        Bo(O) && (Nr.add(O), Ar("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", O, _e3));
      }
    }
    get perf() {
      return __privateGet(this, _v);
    }
    static unsafeExposeInternals(e) {
      return {
        starts: __privateGet(e, _k),
        ttls: __privateGet(e, _h),
        autopurgeTimers: __privateGet(e, _f),
        sizes: __privateGet(e, _w),
        keyMap: __privateGet(e, _o2),
        keyList: __privateGet(e, _r2),
        valList: __privateGet(e, _e2),
        next: __privateGet(e, _c2),
        prev: __privateGet(e, _m),
        get head() {
          return __privateGet(e, _l2);
        },
        get tail() {
          return __privateGet(e, _s2);
        },
        free: __privateGet(e, _y),
        isBackgroundFetch: (o) => {
          var _a5;
          return __privateMethod(_a5 = e, _zr_instances, t_fn).call(_a5, o);
        },
        backgroundFetch: (o, n, s, r) => {
          var _a5;
          return __privateMethod(_a5 = e, _zr_instances, F_fn).call(_a5, o, n, s, r);
        },
        moveToTail: (o) => {
          var _a5;
          return __privateMethod(_a5 = e, _zr_instances, A_fn).call(_a5, o);
        },
        indexes: (o) => {
          var _a5;
          return __privateMethod(_a5 = e, _zr_instances, T_fn).call(_a5, o);
        },
        rindexes: (o) => {
          var _a5;
          return __privateMethod(_a5 = e, _zr_instances, C_fn).call(_a5, o);
        },
        isStale: (o) => {
          var _a5;
          return __privateGet(_a5 = e, _p).call(_a5, o);
        }
      };
    }
    get max() {
      return __privateGet(this, _a4);
    }
    get maxSize() {
      return __privateGet(this, _u);
    }
    get calculatedSize() {
      return __privateGet(this, _x);
    }
    get size() {
      return __privateGet(this, _n2);
    }
    get fetchMethod() {
      return __privateGet(this, _M);
    }
    get memoMethod() {
      return __privateGet(this, _z);
    }
    get dispose() {
      return __privateGet(this, _g);
    }
    get onInsert() {
      return __privateGet(this, _L);
    }
    get disposeAfter() {
      return __privateGet(this, _b2);
    }
    getRemainingTTL(e) {
      return __privateGet(this, _o2).has(e) ? 1 / 0 : 0;
    }
    *entries() {
      for (let e of __privateMethod(this, _zr_instances, T_fn).call(this)) __privateGet(this, _e2)[e] !== void 0 && __privateGet(this, _r2)[e] !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield [
        __privateGet(this, _r2)[e],
        __privateGet(this, _e2)[e]
      ]);
    }
    *rentries() {
      for (let e of __privateMethod(this, _zr_instances, C_fn).call(this)) __privateGet(this, _e2)[e] !== void 0 && __privateGet(this, _r2)[e] !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield [
        __privateGet(this, _r2)[e],
        __privateGet(this, _e2)[e]
      ]);
    }
    *keys() {
      for (let e of __privateMethod(this, _zr_instances, T_fn).call(this)) {
        let o = __privateGet(this, _r2)[e];
        o !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield o);
      }
    }
    *rkeys() {
      for (let e of __privateMethod(this, _zr_instances, C_fn).call(this)) {
        let o = __privateGet(this, _r2)[e];
        o !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield o);
      }
    }
    *values() {
      for (let e of __privateMethod(this, _zr_instances, T_fn).call(this)) __privateGet(this, _e2)[e] !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield __privateGet(this, _e2)[e]);
    }
    *rvalues() {
      for (let e of __privateMethod(this, _zr_instances, C_fn).call(this)) __privateGet(this, _e2)[e] !== void 0 && !__privateMethod(this, _zr_instances, t_fn).call(this, __privateGet(this, _e2)[e]) && (yield __privateGet(this, _e2)[e]);
    }
    [(_d = Symbol.iterator, _c = Symbol.toStringTag, _d)]() {
      return this.entries();
    }
    find(e, o = {}) {
      for (let n of __privateMethod(this, _zr_instances, T_fn).call(this)) {
        let s = __privateGet(this, _e2)[n], r = __privateMethod(this, _zr_instances, t_fn).call(this, s) ? s.__staleWhileFetching : s;
        if (r !== void 0 && e(r, __privateGet(this, _r2)[n], this)) return this.get(__privateGet(this, _r2)[n], o);
      }
    }
    forEach(e, o = this) {
      for (let n of __privateMethod(this, _zr_instances, T_fn).call(this)) {
        let s = __privateGet(this, _e2)[n], r = __privateMethod(this, _zr_instances, t_fn).call(this, s) ? s.__staleWhileFetching : s;
        r !== void 0 && e.call(o, r, __privateGet(this, _r2)[n], this);
      }
    }
    rforEach(e, o = this) {
      for (let n of __privateMethod(this, _zr_instances, C_fn).call(this)) {
        let s = __privateGet(this, _e2)[n], r = __privateMethod(this, _zr_instances, t_fn).call(this, s) ? s.__staleWhileFetching : s;
        r !== void 0 && e.call(o, r, __privateGet(this, _r2)[n], this);
      }
    }
    purgeStale() {
      let e = false;
      for (let o of __privateMethod(this, _zr_instances, C_fn).call(this, {
        allowStale: true
      })) __privateGet(this, _p).call(this, o) && (__privateMethod(this, _zr_instances, E_fn).call(this, __privateGet(this, _r2)[o], "expire"), e = true);
      return e;
    }
    info(e) {
      let o = __privateGet(this, _o2).get(e);
      if (o === void 0) return;
      let n = __privateGet(this, _e2)[o], s = __privateMethod(this, _zr_instances, t_fn).call(this, n) ? n.__staleWhileFetching : n;
      if (s === void 0) return;
      let r = {
        value: s
      };
      if (__privateGet(this, _h) && __privateGet(this, _k)) {
        let i = __privateGet(this, _h)[o], l = __privateGet(this, _k)[o];
        if (i && l) {
          let d = i - (__privateGet(this, _v).now() - l);
          r.ttl = d, r.start = Date.now();
        }
      }
      return __privateGet(this, _w) && (r.size = __privateGet(this, _w)[o]), r;
    }
    dump() {
      let e = [];
      for (let o of __privateMethod(this, _zr_instances, T_fn).call(this, {
        allowStale: true
      })) {
        let n = __privateGet(this, _r2)[o], s = __privateGet(this, _e2)[o], r = __privateMethod(this, _zr_instances, t_fn).call(this, s) ? s.__staleWhileFetching : s;
        if (r === void 0 || n === void 0) continue;
        let i = {
          value: r
        };
        if (__privateGet(this, _h) && __privateGet(this, _k)) {
          i.ttl = __privateGet(this, _h)[o];
          let l = __privateGet(this, _v).now() - __privateGet(this, _k)[o];
          i.start = Math.floor(Date.now() - l);
        }
        __privateGet(this, _w) && (i.size = __privateGet(this, _w)[o]), e.unshift([
          n,
          i
        ]);
      }
      return e;
    }
    load(e) {
      this.clear();
      for (let [o, n] of e) {
        if (n.start) {
          let s = Date.now() - n.start;
          n.start = __privateGet(this, _v).now() - s;
        }
        this.set(o, n.value, n);
      }
    }
    set(e, o, n = {}) {
      var _a5, _b3, _c3, _d3, _e4, _f2, _g2;
      if (o === void 0) return this.delete(e), this;
      let { ttl: s = this.ttl, start: r, noDisposeOnSet: i = this.noDisposeOnSet, sizeCalculation: l = this.sizeCalculation, status: d } = n, { noUpdateTTL: u = this.noUpdateTTL } = n, p = __privateGet(this, _D).call(this, e, o, n.size || 0, l);
      if (this.maxEntrySize && p > this.maxEntrySize) return d && (d.set = "miss", d.maxEntrySizeExceeded = true), __privateMethod(this, _zr_instances, E_fn).call(this, e, "set"), this;
      let c = __privateGet(this, _n2) === 0 ? void 0 : __privateGet(this, _o2).get(e);
      if (c === void 0) c = __privateGet(this, _n2) === 0 ? __privateGet(this, _s2) : __privateGet(this, _y).length !== 0 ? __privateGet(this, _y).pop() : __privateGet(this, _n2) === __privateGet(this, _a4) ? __privateMethod(this, _zr_instances, R_fn).call(this, false) : __privateGet(this, _n2), __privateGet(this, _r2)[c] = e, __privateGet(this, _e2)[c] = o, __privateGet(this, _o2).set(e, c), __privateGet(this, _c2)[__privateGet(this, _s2)] = c, __privateGet(this, _m)[c] = __privateGet(this, _s2), __privateSet(this, _s2, c), __privateWrapper(this, _n2)._++, __privateGet(this, _O).call(this, c, p, d), d && (d.set = "add"), u = false, __privateGet(this, _H) && ((_a5 = __privateGet(this, _L)) == null ? void 0 : _a5.call(this, o, e, "add"));
      else {
        __privateMethod(this, _zr_instances, A_fn).call(this, c);
        let h = __privateGet(this, _e2)[c];
        if (o !== h) {
          if (__privateGet(this, _j) && __privateMethod(this, _zr_instances, t_fn).call(this, h)) {
            h.__abortController.abort(new Error("replaced"));
            let { __staleWhileFetching: g } = h;
            g !== void 0 && !i && (__privateGet(this, _$) && ((_b3 = __privateGet(this, _g)) == null ? void 0 : _b3.call(this, g, e, "set")), __privateGet(this, _d2) && ((_c3 = __privateGet(this, _i2)) == null ? void 0 : _c3.push([
              g,
              e,
              "set"
            ])));
          } else i || (__privateGet(this, _$) && ((_d3 = __privateGet(this, _g)) == null ? void 0 : _d3.call(this, h, e, "set")), __privateGet(this, _d2) && ((_e4 = __privateGet(this, _i2)) == null ? void 0 : _e4.push([
            h,
            e,
            "set"
          ])));
          if (__privateGet(this, _N).call(this, c), __privateGet(this, _O).call(this, c, p, d), __privateGet(this, _e2)[c] = o, d) {
            d.set = "replace";
            let g = h && __privateMethod(this, _zr_instances, t_fn).call(this, h) ? h.__staleWhileFetching : h;
            g !== void 0 && (d.oldValue = g);
          }
        } else d && (d.set = "update");
        __privateGet(this, _H) && ((_f2 = this.onInsert) == null ? void 0 : _f2.call(this, o, e, o === h ? "update" : "replace"));
      }
      if (s !== 0 && !__privateGet(this, _h) && __privateMethod(this, _zr_instances, __fn).call(this), __privateGet(this, _h) && (u || __privateGet(this, _P).call(this, c, s, r), d && __privateGet(this, _S).call(this, d, c)), !i && __privateGet(this, _d2) && __privateGet(this, _i2)) {
        let h = __privateGet(this, _i2), g;
        for (; g = h == null ? void 0 : h.shift(); ) (_g2 = __privateGet(this, _b2)) == null ? void 0 : _g2.call(this, ...g);
      }
      return this;
    }
    pop() {
      var _a5;
      try {
        for (; __privateGet(this, _n2); ) {
          let e = __privateGet(this, _e2)[__privateGet(this, _l2)];
          if (__privateMethod(this, _zr_instances, R_fn).call(this, true), __privateMethod(this, _zr_instances, t_fn).call(this, e)) {
            if (e.__staleWhileFetching) return e.__staleWhileFetching;
          } else if (e !== void 0) return e;
        }
      } finally {
        if (__privateGet(this, _d2) && __privateGet(this, _i2)) {
          let e = __privateGet(this, _i2), o;
          for (; o = e == null ? void 0 : e.shift(); ) (_a5 = __privateGet(this, _b2)) == null ? void 0 : _a5.call(this, ...o);
        }
      }
    }
    has(e, o = {}) {
      let { updateAgeOnHas: n = this.updateAgeOnHas, status: s } = o, r = __privateGet(this, _o2).get(e);
      if (r !== void 0) {
        let i = __privateGet(this, _e2)[r];
        if (__privateMethod(this, _zr_instances, t_fn).call(this, i) && i.__staleWhileFetching === void 0) return false;
        if (__privateGet(this, _p).call(this, r)) s && (s.has = "stale", __privateGet(this, _S).call(this, s, r));
        else return n && __privateGet(this, _I).call(this, r), s && (s.has = "hit", __privateGet(this, _S).call(this, s, r)), true;
      } else s && (s.has = "miss");
      return false;
    }
    peek(e, o = {}) {
      let { allowStale: n = this.allowStale } = o, s = __privateGet(this, _o2).get(e);
      if (s === void 0 || !n && __privateGet(this, _p).call(this, s)) return;
      let r = __privateGet(this, _e2)[s];
      return __privateMethod(this, _zr_instances, t_fn).call(this, r) ? r.__staleWhileFetching : r;
    }
    async fetch(e, o = {}) {
      let { allowStale: n = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: r = this.noDeleteOnStaleGet, ttl: i = this.ttl, noDisposeOnSet: l = this.noDisposeOnSet, size: d = 0, sizeCalculation: u = this.sizeCalculation, noUpdateTTL: p = this.noUpdateTTL, noDeleteOnFetchRejection: c = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: h = this.allowStaleOnFetchRejection, ignoreFetchAbort: g = this.ignoreFetchAbort, allowStaleOnFetchAbort: b = this.allowStaleOnFetchAbort, context: x, forceRefresh: v = false, status: w, signal: y } = o;
      if (!__privateGet(this, _j)) return w && (w.fetch = "get"), this.get(e, {
        allowStale: n,
        updateAgeOnGet: s,
        noDeleteOnStaleGet: r,
        status: w
      });
      let T = {
        allowStale: n,
        updateAgeOnGet: s,
        noDeleteOnStaleGet: r,
        ttl: i,
        noDisposeOnSet: l,
        size: d,
        sizeCalculation: u,
        noUpdateTTL: p,
        noDeleteOnFetchRejection: c,
        allowStaleOnFetchRejection: h,
        allowStaleOnFetchAbort: b,
        ignoreFetchAbort: g,
        status: w,
        signal: y
      }, k = __privateGet(this, _o2).get(e);
      if (k === void 0) {
        w && (w.fetch = "miss");
        let C = __privateMethod(this, _zr_instances, F_fn).call(this, e, k, T, x);
        return C.__returned = C;
      } else {
        let C = __privateGet(this, _e2)[k];
        if (__privateMethod(this, _zr_instances, t_fn).call(this, C)) {
          let S = n && C.__staleWhileFetching !== void 0;
          return w && (w.fetch = "inflight", S && (w.returnedStale = true)), S ? C.__staleWhileFetching : C.__returned = C;
        }
        let I = __privateGet(this, _p).call(this, k);
        if (!v && !I) return w && (w.fetch = "hit"), __privateMethod(this, _zr_instances, A_fn).call(this, k), s && __privateGet(this, _I).call(this, k), w && __privateGet(this, _S).call(this, w, k), C;
        let N = __privateMethod(this, _zr_instances, F_fn).call(this, e, k, T, x), $ = N.__staleWhileFetching !== void 0 && n;
        return w && (w.fetch = I ? "stale" : "refresh", $ && I && (w.returnedStale = true)), $ ? N.__staleWhileFetching : N.__returned = N;
      }
    }
    async forceFetch(e, o = {}) {
      let n = await this.fetch(e, o);
      if (n === void 0) throw new Error("fetch() returned undefined");
      return n;
    }
    memo(e, o = {}) {
      let n = __privateGet(this, _z);
      if (!n) throw new Error("no memoMethod provided to constructor");
      let { context: s, forceRefresh: r, ...i } = o, l = this.get(e, i);
      if (!r && l !== void 0) return l;
      let d = n(e, l, {
        options: i,
        context: s
      });
      return this.set(e, d, i), d;
    }
    get(e, o = {}) {
      let { allowStale: n = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: r = this.noDeleteOnStaleGet, status: i } = o, l = __privateGet(this, _o2).get(e);
      if (l !== void 0) {
        let d = __privateGet(this, _e2)[l], u = __privateMethod(this, _zr_instances, t_fn).call(this, d);
        return i && __privateGet(this, _S).call(this, i, l), __privateGet(this, _p).call(this, l) ? (i && (i.get = "stale"), u ? (i && n && d.__staleWhileFetching !== void 0 && (i.returnedStale = true), n ? d.__staleWhileFetching : void 0) : (r || __privateMethod(this, _zr_instances, E_fn).call(this, e, "expire"), i && n && (i.returnedStale = true), n ? d : void 0)) : (i && (i.get = "hit"), u ? d.__staleWhileFetching : (__privateMethod(this, _zr_instances, A_fn).call(this, l), s && __privateGet(this, _I).call(this, l), d));
      } else i && (i.get = "miss");
    }
    delete(e) {
      return __privateMethod(this, _zr_instances, E_fn).call(this, e, "delete");
    }
    clear() {
      return __privateMethod(this, _zr_instances, B_fn).call(this, "delete");
    }
  }, _a4 = new WeakMap(), _u = new WeakMap(), _g = new WeakMap(), _L = new WeakMap(), _b2 = new WeakMap(), _M = new WeakMap(), _z = new WeakMap(), _v = new WeakMap(), _n2 = new WeakMap(), _x = new WeakMap(), _o2 = new WeakMap(), _r2 = new WeakMap(), _e2 = new WeakMap(), _c2 = new WeakMap(), _m = new WeakMap(), _l2 = new WeakMap(), _s2 = new WeakMap(), _y = new WeakMap(), _i2 = new WeakMap(), _w = new WeakMap(), _k = new WeakMap(), _h = new WeakMap(), _f = new WeakMap(), _$ = new WeakMap(), _j = new WeakMap(), _d2 = new WeakMap(), _H = new WeakMap(), _zr_instances = new WeakSet(), __fn = function() {
    let e = new We(__privateGet(this, _a4)), o = new We(__privateGet(this, _a4));
    __privateSet(this, _h, e), __privateSet(this, _k, o);
    let n = this.ttlAutopurge ? new Array(__privateGet(this, _a4)) : void 0;
    __privateSet(this, _f, n), __privateSet(this, _P, (i, l, d = __privateGet(this, _v).now()) => {
      if (o[i] = l !== 0 ? d : 0, e[i] = l, (n == null ? void 0 : n[i]) && (clearTimeout(n[i]), n[i] = void 0), l !== 0 && n) {
        let u = setTimeout(() => {
          __privateGet(this, _p).call(this, i) && __privateMethod(this, _zr_instances, E_fn).call(this, __privateGet(this, _r2)[i], "expire");
        }, l + 1);
        u.unref && u.unref(), n[i] = u;
      }
    }), __privateSet(this, _I, (i) => {
      o[i] = e[i] !== 0 ? __privateGet(this, _v).now() : 0;
    }), __privateSet(this, _S, (i, l) => {
      if (e[l]) {
        let d = e[l], u = o[l];
        if (!d || !u) return;
        i.ttl = d, i.start = u, i.now = s || r();
        let p = i.now - u;
        i.remainingTTL = d - p;
      }
    });
    let s = 0, r = () => {
      let i = __privateGet(this, _v).now();
      if (this.ttlResolution > 0) {
        s = i;
        let l = setTimeout(() => s = 0, this.ttlResolution);
        l.unref && l.unref();
      }
      return i;
    };
    this.getRemainingTTL = (i) => {
      let l = __privateGet(this, _o2).get(i);
      if (l === void 0) return 0;
      let d = e[l], u = o[l];
      if (!d || !u) return 1 / 0;
      let p = (s || r()) - u;
      return d - p;
    }, __privateSet(this, _p, (i) => {
      let l = o[i], d = e[i];
      return !!d && !!l && (s || r()) - l > d;
    });
  }, _I = new WeakMap(), _S = new WeakMap(), _P = new WeakMap(), _p = new WeakMap(), V_fn = function() {
    let e = new We(__privateGet(this, _a4));
    __privateSet(this, _x, 0), __privateSet(this, _w, e), __privateSet(this, _N, (o) => {
      __privateSet(this, _x, __privateGet(this, _x) - e[o]), e[o] = 0;
    }), __privateSet(this, _D, (o, n, s, r) => {
      if (__privateMethod(this, _zr_instances, t_fn).call(this, n)) return 0;
      if (!be(s)) if (r) {
        if (typeof r != "function") throw new TypeError("sizeCalculation must be a function");
        if (s = r(n, o), !be(s)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
      } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return s;
    }), __privateSet(this, _O, (o, n, s) => {
      if (e[o] = n, __privateGet(this, _u)) {
        let r = __privateGet(this, _u) - e[o];
        for (; __privateGet(this, _x) > r; ) __privateMethod(this, _zr_instances, R_fn).call(this, true);
      }
      __privateSet(this, _x, __privateGet(this, _x) + e[o]), s && (s.entrySize = n, s.totalCalculatedSize = __privateGet(this, _x));
    });
  }, _N = new WeakMap(), _O = new WeakMap(), _D = new WeakMap(), T_fn = function* ({ allowStale: e = this.allowStale } = {}) {
    if (__privateGet(this, _n2)) for (let o = __privateGet(this, _s2); !(!__privateMethod(this, _zr_instances, q_fn).call(this, o) || ((e || !__privateGet(this, _p).call(this, o)) && (yield o), o === __privateGet(this, _l2))); ) o = __privateGet(this, _m)[o];
  }, C_fn = function* ({ allowStale: e = this.allowStale } = {}) {
    if (__privateGet(this, _n2)) for (let o = __privateGet(this, _l2); !(!__privateMethod(this, _zr_instances, q_fn).call(this, o) || ((e || !__privateGet(this, _p).call(this, o)) && (yield o), o === __privateGet(this, _s2))); ) o = __privateGet(this, _c2)[o];
  }, q_fn = function(e) {
    return e !== void 0 && __privateGet(this, _o2).get(__privateGet(this, _r2)[e]) === e;
  }, R_fn = function(e) {
    var _a5, _b3, _c3;
    let o = __privateGet(this, _l2), n = __privateGet(this, _r2)[o], s = __privateGet(this, _e2)[o];
    return __privateGet(this, _j) && __privateMethod(this, _zr_instances, t_fn).call(this, s) ? s.__abortController.abort(new Error("evicted")) : (__privateGet(this, _$) || __privateGet(this, _d2)) && (__privateGet(this, _$) && ((_a5 = __privateGet(this, _g)) == null ? void 0 : _a5.call(this, s, n, "evict")), __privateGet(this, _d2) && ((_b3 = __privateGet(this, _i2)) == null ? void 0 : _b3.push([
      s,
      n,
      "evict"
    ]))), __privateGet(this, _N).call(this, o), ((_c3 = __privateGet(this, _f)) == null ? void 0 : _c3[o]) && (clearTimeout(__privateGet(this, _f)[o]), __privateGet(this, _f)[o] = void 0), e && (__privateGet(this, _r2)[o] = void 0, __privateGet(this, _e2)[o] = void 0, __privateGet(this, _y).push(o)), __privateGet(this, _n2) === 1 ? (__privateSet(this, _l2, __privateSet(this, _s2, 0)), __privateGet(this, _y).length = 0) : __privateSet(this, _l2, __privateGet(this, _c2)[o]), __privateGet(this, _o2).delete(n), __privateWrapper(this, _n2)._--, o;
  }, F_fn = function(e, o, n, s) {
    let r = o === void 0 ? void 0 : __privateGet(this, _e2)[o];
    if (__privateMethod(this, _zr_instances, t_fn).call(this, r)) return r;
    let i = new Ye(), { signal: l } = n;
    l == null ? void 0 : l.addEventListener("abort", () => i.abort(l.reason), {
      signal: i.signal
    });
    let d = {
      signal: i.signal,
      options: n,
      context: s
    }, u = (x, v = false) => {
      let { aborted: w } = i.signal, y = n.ignoreFetchAbort && x !== void 0, T = n.ignoreFetchAbort || !!(n.allowStaleOnFetchAbort && x !== void 0);
      if (n.status && (w && !v ? (n.status.fetchAborted = true, n.status.fetchError = i.signal.reason, y && (n.status.fetchAbortIgnored = true)) : n.status.fetchResolved = true), w && !y && !v) return c(i.signal.reason, T);
      let k = g, C = __privateGet(this, _e2)[o];
      return (C === g || y && v && C === void 0) && (x === void 0 ? k.__staleWhileFetching !== void 0 ? __privateGet(this, _e2)[o] = k.__staleWhileFetching : __privateMethod(this, _zr_instances, E_fn).call(this, e, "fetch") : (n.status && (n.status.fetchUpdated = true), this.set(e, x, d.options))), x;
    }, p = (x) => (n.status && (n.status.fetchRejected = true, n.status.fetchError = x), c(x, false)), c = (x, v) => {
      let { aborted: w } = i.signal, y = w && n.allowStaleOnFetchAbort, T = y || n.allowStaleOnFetchRejection, k = T || n.noDeleteOnFetchRejection, C = g;
      if (__privateGet(this, _e2)[o] === g && (!k || !v && C.__staleWhileFetching === void 0 ? __privateMethod(this, _zr_instances, E_fn).call(this, e, "fetch") : y || (__privateGet(this, _e2)[o] = C.__staleWhileFetching)), T) return n.status && C.__staleWhileFetching !== void 0 && (n.status.returnedStale = true), C.__staleWhileFetching;
      if (C.__returned === C) throw x;
    }, h = (x, v) => {
      var _a5;
      let w = (_a5 = __privateGet(this, _M)) == null ? void 0 : _a5.call(this, e, r, d);
      w && w instanceof Promise && w.then((y) => x(y === void 0 ? void 0 : y), v), i.signal.addEventListener("abort", () => {
        (!n.ignoreFetchAbort || n.allowStaleOnFetchAbort) && (x(void 0), n.allowStaleOnFetchAbort && (x = (y) => u(y, true)));
      });
    };
    n.status && (n.status.fetchDispatched = true);
    let g = new Promise(h).then(u, p), b = Object.assign(g, {
      __abortController: i,
      __staleWhileFetching: r,
      __returned: void 0
    });
    return o === void 0 ? (this.set(e, b, {
      ...d.options,
      status: void 0
    }), o = __privateGet(this, _o2).get(e)) : __privateGet(this, _e2)[o] = b, b;
  }, t_fn = function(e) {
    if (!__privateGet(this, _j)) return false;
    let o = e;
    return !!o && o instanceof Promise && o.hasOwnProperty("__staleWhileFetching") && o.__abortController instanceof Ye;
  }, W_fn = function(e, o) {
    __privateGet(this, _m)[o] = e, __privateGet(this, _c2)[e] = o;
  }, A_fn = function(e) {
    e !== __privateGet(this, _s2) && (e === __privateGet(this, _l2) ? __privateSet(this, _l2, __privateGet(this, _c2)[e]) : __privateMethod(this, _zr_instances, W_fn).call(this, __privateGet(this, _m)[e], __privateGet(this, _c2)[e]), __privateMethod(this, _zr_instances, W_fn).call(this, __privateGet(this, _s2), e), __privateSet(this, _s2, e));
  }, E_fn = function(e, o) {
    var _a5, _b3, _c3, _d3, _e4, _f2;
    let n = false;
    if (__privateGet(this, _n2) !== 0) {
      let s = __privateGet(this, _o2).get(e);
      if (s !== void 0) if (((_a5 = __privateGet(this, _f)) == null ? void 0 : _a5[s]) && (clearTimeout((_b3 = __privateGet(this, _f)) == null ? void 0 : _b3[s]), __privateGet(this, _f)[s] = void 0), n = true, __privateGet(this, _n2) === 1) __privateMethod(this, _zr_instances, B_fn).call(this, o);
      else {
        __privateGet(this, _N).call(this, s);
        let r = __privateGet(this, _e2)[s];
        if (__privateMethod(this, _zr_instances, t_fn).call(this, r) ? r.__abortController.abort(new Error("deleted")) : (__privateGet(this, _$) || __privateGet(this, _d2)) && (__privateGet(this, _$) && ((_c3 = __privateGet(this, _g)) == null ? void 0 : _c3.call(this, r, e, o)), __privateGet(this, _d2) && ((_d3 = __privateGet(this, _i2)) == null ? void 0 : _d3.push([
          r,
          e,
          o
        ]))), __privateGet(this, _o2).delete(e), __privateGet(this, _r2)[s] = void 0, __privateGet(this, _e2)[s] = void 0, s === __privateGet(this, _s2)) __privateSet(this, _s2, __privateGet(this, _m)[s]);
        else if (s === __privateGet(this, _l2)) __privateSet(this, _l2, __privateGet(this, _c2)[s]);
        else {
          let i = __privateGet(this, _m)[s];
          __privateGet(this, _c2)[i] = __privateGet(this, _c2)[s];
          let l = __privateGet(this, _c2)[s];
          __privateGet(this, _m)[l] = __privateGet(this, _m)[s];
        }
        __privateWrapper(this, _n2)._--, __privateGet(this, _y).push(s);
      }
    }
    if (__privateGet(this, _d2) && ((_e4 = __privateGet(this, _i2)) == null ? void 0 : _e4.length)) {
      let s = __privateGet(this, _i2), r;
      for (; r = s == null ? void 0 : s.shift(); ) (_f2 = __privateGet(this, _b2)) == null ? void 0 : _f2.call(this, ...r);
    }
    return n;
  }, B_fn = function(e) {
    var _a5, _b3, _c3, _d3;
    for (let o of __privateMethod(this, _zr_instances, C_fn).call(this, {
      allowStale: true
    })) {
      let n = __privateGet(this, _e2)[o];
      if (__privateMethod(this, _zr_instances, t_fn).call(this, n)) n.__abortController.abort(new Error("deleted"));
      else {
        let s = __privateGet(this, _r2)[o];
        __privateGet(this, _$) && ((_a5 = __privateGet(this, _g)) == null ? void 0 : _a5.call(this, n, s, e)), __privateGet(this, _d2) && ((_b3 = __privateGet(this, _i2)) == null ? void 0 : _b3.push([
          n,
          s,
          e
        ]));
      }
    }
    if (__privateGet(this, _o2).clear(), __privateGet(this, _e2).fill(void 0), __privateGet(this, _r2).fill(void 0), __privateGet(this, _h) && __privateGet(this, _k)) {
      __privateGet(this, _h).fill(0), __privateGet(this, _k).fill(0);
      for (let o of __privateGet(this, _f) ?? []) o !== void 0 && clearTimeout(o);
      (_c3 = __privateGet(this, _f)) == null ? void 0 : _c3.fill(void 0);
    }
    if (__privateGet(this, _w) && __privateGet(this, _w).fill(0), __privateSet(this, _l2, 0), __privateSet(this, _s2, 0), __privateGet(this, _y).length = 0, __privateSet(this, _x, 0), __privateSet(this, _n2, 0), __privateGet(this, _d2) && __privateGet(this, _i2)) {
      let o = __privateGet(this, _i2), n;
      for (; n = o == null ? void 0 : o.shift(); ) (_d3 = __privateGet(this, _b2)) == null ? void 0 : _d3.call(this, ...n);
    }
  }, _e3);
  var we = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = arguments[e];
      for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
  }, Pe = function(e) {
    return e.tagName === "IMG";
  }, Go = function(e) {
    return NodeList.prototype.isPrototypeOf(e);
  }, Be = function(e) {
    return e && e.nodeType === 1;
  }, Pt = function(e) {
    var o = e.currentSrc || e.src;
    return o.substr(-4).toLowerCase() === ".svg";
  }, Dt = function(e) {
    try {
      return Array.isArray(e) ? e.filter(Pe) : Go(e) ? [].slice.call(e).filter(Pe) : Be(e) ? [
        e
      ].filter(Pe) : typeof e == "string" ? [].slice.call(document.querySelectorAll(e)).filter(Pe) : [];
    } catch {
      throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`);
    }
  }, Ko = function(e) {
    var o = document.createElement("div");
    return o.classList.add("medium-zoom-overlay"), o.style.background = e, o;
  }, Zo = function(e) {
    var o = e.getBoundingClientRect(), n = o.top, s = o.left, r = o.width, i = o.height, l = e.cloneNode(), d = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, u = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    return l.removeAttribute("id"), l.style.position = "absolute", l.style.top = n + d + "px", l.style.left = s + u + "px", l.style.width = r + "px", l.style.height = i + "px", l.style.transform = "", l;
  }, Te = function(e, o) {
    var n = we({
      bubbles: false,
      cancelable: false,
      detail: void 0
    }, o);
    if (typeof window.CustomEvent == "function") return new CustomEvent(e, n);
    var s = document.createEvent("CustomEvent");
    return s.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), s;
  }, Xo = function t(e) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = window.Promise || function(A) {
      function H() {
      }
      A(H, H);
    }, s = function(A) {
      var H = A.target;
      if (H === S) {
        b();
        return;
      }
      T.indexOf(H) !== -1 && x({
        target: H
      });
    }, r = function() {
      if (!(C || !$.original)) {
        var A = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        Math.abs(I - A) > N.scrollOffset && setTimeout(b, 150);
      }
    }, i = function(A) {
      var H = A.key || A.keyCode;
      (H === "Escape" || H === "Esc" || H === 27) && b();
    }, l = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, H = A;
      if (A.background && (S.style.background = A.background), A.container && A.container instanceof Object && (H.container = we({}, N.container, A.container)), A.template) {
        var F = Be(A.template) ? A.template : document.querySelector(A.template);
        H.template = F;
      }
      return N = we({}, N, H), T.forEach(function(P) {
        P.dispatchEvent(Te("medium-zoom:update", {
          detail: {
            zoom: O
          }
        }));
      }), O;
    }, d = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return t(we({}, N, A));
    }, u = function() {
      for (var A = arguments.length, H = Array(A), F = 0; F < A; F++) H[F] = arguments[F];
      var P = H.reduce(function(j, M) {
        return [].concat(j, Dt(M));
      }, []);
      return P.filter(function(j) {
        return T.indexOf(j) === -1;
      }).forEach(function(j) {
        T.push(j), j.classList.add("medium-zoom-image");
      }), k.forEach(function(j) {
        var M = j.type, L = j.listener, W = j.options;
        P.forEach(function(V) {
          V.addEventListener(M, L, W);
        });
      }), O;
    }, p = function() {
      for (var A = arguments.length, H = Array(A), F = 0; F < A; F++) H[F] = arguments[F];
      $.zoomed && b();
      var P = H.length > 0 ? H.reduce(function(j, M) {
        return [].concat(j, Dt(M));
      }, []) : T;
      return P.forEach(function(j) {
        j.classList.remove("medium-zoom-image"), j.dispatchEvent(Te("medium-zoom:detach", {
          detail: {
            zoom: O
          }
        }));
      }), T = T.filter(function(j) {
        return P.indexOf(j) === -1;
      }), O;
    }, c = function(A, H) {
      var F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return T.forEach(function(P) {
        P.addEventListener("medium-zoom:" + A, H, F);
      }), k.push({
        type: "medium-zoom:" + A,
        listener: H,
        options: F
      }), O;
    }, h = function(A, H) {
      var F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return T.forEach(function(P) {
        P.removeEventListener("medium-zoom:" + A, H, F);
      }), k = k.filter(function(P) {
        return !(P.type === "medium-zoom:" + A && P.listener.toString() === H.toString());
      }), O;
    }, g = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, H = A.target, F = function() {
        var j = {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }, M = void 0, L = void 0;
        if (N.container) if (N.container instanceof Object) j = we({}, j, N.container), M = j.width - j.left - j.right - N.margin * 2, L = j.height - j.top - j.bottom - N.margin * 2;
        else {
          var W = Be(N.container) ? N.container : document.querySelector(N.container), V = W.getBoundingClientRect(), X = V.width, J = V.height, re = V.left, oe = V.top;
          j = we({}, j, {
            width: X,
            height: J,
            left: re,
            top: oe
          });
        }
        M = M || j.width - N.margin * 2, L = L || j.height - N.margin * 2;
        var Z = $.zoomedHd || $.original, pe = Pt(Z) ? M : Z.naturalWidth || M, ge = Pt(Z) ? L : Z.naturalHeight || L, de = Z.getBoundingClientRect(), K = de.top, te = de.left, ie = de.width, ne = de.height, fe = Math.min(Math.max(ie, pe), M) / ie, ae = Math.min(Math.max(ne, ge), L) / ne, le = Math.min(fe, ae), je = (-te + (M - ie) / 2 + N.margin + j.left) / le, $e = (-K + (L - ne) / 2 + N.margin + j.top) / le, Fe = "scale(" + le + ") translate3d(" + je + "px, " + $e + "px, 0)";
        $.zoomed.style.transform = Fe, $.zoomedHd && ($.zoomedHd.style.transform = Fe);
      };
      return new n(function(P) {
        if (H && T.indexOf(H) === -1) {
          P(O);
          return;
        }
        var j = function X() {
          C = false, $.zoomed.removeEventListener("transitionend", X), $.original.dispatchEvent(Te("medium-zoom:opened", {
            detail: {
              zoom: O
            }
          })), P(O);
        };
        if ($.zoomed) {
          P(O);
          return;
        }
        if (H) $.original = H;
        else if (T.length > 0) {
          var M = T;
          $.original = M[0];
        } else {
          P(O);
          return;
        }
        if ($.original.dispatchEvent(Te("medium-zoom:open", {
          detail: {
            zoom: O
          }
        })), I = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, C = true, $.zoomed = Zo($.original), document.body.appendChild(S), N.template) {
          var L = Be(N.template) ? N.template : document.querySelector(N.template);
          $.template = document.createElement("div"), $.template.appendChild(L.content.cloneNode(true)), document.body.appendChild($.template);
        }
        if ($.original.parentElement && $.original.parentElement.tagName === "PICTURE" && $.original.currentSrc && ($.zoomed.src = $.original.currentSrc), document.body.appendChild($.zoomed), window.requestAnimationFrame(function() {
          document.body.classList.add("medium-zoom--opened");
        }), $.original.classList.add("medium-zoom-image--hidden"), $.zoomed.classList.add("medium-zoom-image--opened"), $.zoomed.addEventListener("click", b), $.zoomed.addEventListener("transitionend", j), $.original.getAttribute("data-zoom-src")) {
          $.zoomedHd = $.zoomed.cloneNode(), $.zoomedHd.removeAttribute("srcset"), $.zoomedHd.removeAttribute("sizes"), $.zoomedHd.removeAttribute("loading"), $.zoomedHd.src = $.zoomed.getAttribute("data-zoom-src"), $.zoomedHd.onerror = function() {
            clearInterval(W), console.warn("Unable to reach the zoom image target " + $.zoomedHd.src), $.zoomedHd = null, F();
          };
          var W = setInterval(function() {
            $.zoomedHd.complete && (clearInterval(W), $.zoomedHd.classList.add("medium-zoom-image--opened"), $.zoomedHd.addEventListener("click", b), document.body.appendChild($.zoomedHd), F());
          }, 10);
        } else if ($.original.hasAttribute("srcset")) {
          $.zoomedHd = $.zoomed.cloneNode(), $.zoomedHd.removeAttribute("sizes"), $.zoomedHd.removeAttribute("loading");
          var V = $.zoomedHd.addEventListener("load", function() {
            $.zoomedHd.removeEventListener("load", V), $.zoomedHd.classList.add("medium-zoom-image--opened"), $.zoomedHd.addEventListener("click", b), document.body.appendChild($.zoomedHd), F();
          });
        } else F();
      });
    }, b = function() {
      return new n(function(A) {
        if (C || !$.original) {
          A(O);
          return;
        }
        var H = function F() {
          $.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild($.zoomed), $.zoomedHd && document.body.removeChild($.zoomedHd), document.body.removeChild(S), $.zoomed.classList.remove("medium-zoom-image--opened"), $.template && document.body.removeChild($.template), C = false, $.zoomed.removeEventListener("transitionend", F), $.original.dispatchEvent(Te("medium-zoom:closed", {
            detail: {
              zoom: O
            }
          })), $.original = null, $.zoomed = null, $.zoomedHd = null, $.template = null, A(O);
        };
        C = true, document.body.classList.remove("medium-zoom--opened"), $.zoomed.style.transform = "", $.zoomedHd && ($.zoomedHd.style.transform = ""), $.template && ($.template.style.transition = "opacity 150ms", $.template.style.opacity = 0), $.original.dispatchEvent(Te("medium-zoom:close", {
          detail: {
            zoom: O
          }
        })), $.zoomed.addEventListener("transitionend", H);
      });
    }, x = function() {
      var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, H = A.target;
      return $.original ? b() : g({
        target: H
      });
    }, v = function() {
      return N;
    }, w = function() {
      return T;
    }, y = function() {
      return $.original;
    }, T = [], k = [], C = false, I = 0, N = o, $ = {
      original: null,
      zoomed: null,
      zoomedHd: null,
      template: null
    };
    Object.prototype.toString.call(e) === "[object Object]" ? N = e : (e || typeof e == "string") && u(e), N = we({
      margin: 0,
      background: "#fff",
      scrollOffset: 40,
      container: null,
      template: null
    }, N);
    var S = Ko(N.background);
    document.addEventListener("click", s), document.addEventListener("keyup", i), document.addEventListener("scroll", r), window.addEventListener("resize", b);
    var O = {
      open: g,
      close: b,
      toggle: x,
      update: l,
      clone: d,
      attach: u,
      detach: p,
      on: c,
      off: h,
      getOptions: v,
      getImages: w,
      getZoomedImage: y
    };
    return O;
  };
  function Yo(t, e) {
    e === void 0 && (e = {});
    var o = e.insertAt;
    if (!(typeof document > "u")) {
      var n = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
      s.type = "text/css", o === "top" && n.firstChild ? n.insertBefore(s, n.firstChild) : n.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
    }
  }
  var Qo = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
  Yo(Qo);
  const se = {
    hljs: `${m}-hljs`,
    hlcss: `${m}-hlCss`,
    prettier: `${m}-prettier`,
    prettierMD: `${m}-prettierMD`,
    cropperjs: `${m}-cropper`,
    croppercss: `${m}-cropperCss`,
    screenfull: `${m}-screenfull`,
    mermaidM: `${m}-mermaid-m`,
    mermaid: `${m}-mermaid`,
    katexjs: `${m}-katex`,
    katexcss: `${m}-katexCss`,
    echarts: `${m}-echarts`
  }, Jo = (t, e, o) => {
    const { editorId: n, usedLanguageText: s, customIcon: r, rootRef: i, setting: l } = a.useContext(D), { formatCopiedText: d = (u) => u } = t;
    a.useEffect(() => {
      var _a5;
      l.preview && ((_a5 = i.current) == null ? void 0 : _a5.querySelectorAll(`#${n} .${m}-preview .${m}-code`).forEach((u) => {
        let p = -1;
        const c = u.querySelector(`.${m}-copy-button:not([data-processed])`);
        c && (c.onclick = (h) => {
          h.preventDefault(), clearTimeout(p);
          const g = (u.querySelector("input:checked + pre code") || u.querySelector("pre code")).textContent || "", { text: b, successTips: x, failTips: v } = s.copyCode;
          let w = x;
          Ir(d(g)).catch(() => {
            w = v;
          }).finally(() => {
            c.dataset.isIcon ? c.dataset.tips = w : c.innerHTML = w, p = window.setTimeout(() => {
              c.dataset.isIcon ? c.dataset.tips = b : c.innerHTML = b;
            }, 1500);
          });
        }, c.setAttribute("data-processed", "true"));
      }));
    }, [
      r,
      n,
      d,
      e,
      o,
      l.preview,
      i,
      s.copyCode
    ]);
  }, en = (t) => {
    var _a5;
    const { editorId: e, theme: o, rootRef: n } = a.useContext(D), s = a.useRef((_a5 = Q.editorExtensions.echarts) == null ? void 0 : _a5.instance), [r, i] = a.useState(0), l = a.useRef([]), d = a.useRef([]), u = a.useRef([]), p = a.useCallback(() => {
      !t.noEcharts && s.current && i((g) => g + 1);
    }, [
      t.noEcharts
    ]);
    a.useEffect(() => {
      p();
    }, [
      o,
      p
    ]), a.useEffect(() => {
      var _a6;
      if (t.noEcharts || s.current) return;
      const { editorExtensions: g, editorExtensionsAttrs: b } = Q, x = g.echarts.js;
      ue("script", {
        ...(_a6 = b.echarts) == null ? void 0 : _a6.js,
        src: x,
        id: se.echarts,
        onload() {
          s.current = window.echarts, p();
        }
      }, "echarts");
    }, [
      t.noEcharts,
      p
    ]);
    const c = a.useCallback((g = false) => {
      const b = u.current;
      if (!b.length) {
        g && (l.current.forEach((y) => {
          var _a6;
          return (_a6 = y == null ? void 0 : y.dispose) == null ? void 0 : _a6.call(y);
        }), d.current.forEach((y) => {
          var _a6;
          return (_a6 = y == null ? void 0 : y.disconnect) == null ? void 0 : _a6.call(y);
        }), l.current = [], d.current = [], u.current = []);
        return;
      }
      const x = [], v = [], w = [];
      b.forEach((y, T) => {
        var _a6, _b3;
        const k = l.current[T], C = d.current[T];
        if (g || !y || !y.isConnected || (n == null ? void 0 : n.current) && !n.current.contains(y)) {
          (_a6 = k == null ? void 0 : k.dispose) == null ? void 0 : _a6.call(k), (_b3 = C == null ? void 0 : C.disconnect) == null ? void 0 : _b3.call(C);
          return;
        }
        x.push(y), k && v.push(k), C && w.push(C);
      }), u.current = x, l.current = v, d.current = w;
    }, [
      n
    ]), h = a.useCallback(() => {
      c(), !t.noEcharts && s.current && (n == null ? void 0 : n.current) && Array.from(n.current.querySelectorAll(`#${e} div.${m}-echarts:not([data-processed])`)).forEach((g) => {
        if (g.dataset.closed !== "false") try {
          const b = new Function(`return ${g.innerText}`)(), x = s.current.init(g, o);
          x.setOption(b), g.setAttribute("data-processed", ""), u.current.push(g), l.current.push(x);
          const v = new ResizeObserver(() => {
            x.resize();
          });
          v.observe(g), d.current.push(v);
        } catch (b) {
          E.emit(e, he, {
            name: "echarts",
            message: b == null ? void 0 : b.message,
            error: b
          });
        }
      });
    }, [
      t.noEcharts,
      n,
      e,
      o,
      c
    ]);
    return a.useEffect(() => () => {
      c(true);
    }, [
      c
    ]), {
      reRenderEcharts: r,
      replaceEcharts: h
    };
  }, tn = (t) => {
    const { highlight: e } = a.useContext(D), o = a.useRef(Q.editorExtensions.highlight.instance), [n, s] = a.useState(!!o.current);
    return a.useEffect(() => {
      t.noHighlight || Q.editorExtensions.highlight.instance || _o("link", {
        ...e.css,
        rel: "stylesheet",
        id: se.hlcss
      });
    }, [
      e.css,
      t.noHighlight
    ]), a.useEffect(() => {
      t.noHighlight || o.current || ue("script", {
        ...e.js,
        id: se.hljs,
        onload() {
          o.current = window.hljs, s(true);
        }
      }, "hljs");
    }, []), {
      hljsRef: o,
      hljsInited: n
    };
  }, rn = (t) => {
    const e = a.useRef(Q.editorExtensions.katex.instance), [o, n] = a.useState(!!e.current);
    return a.useEffect(() => {
      var _a5, _b3;
      if (t.noKatex || e.current) return;
      const { editorExtensions: s, editorExtensionsAttrs: r } = Q;
      ue("script", {
        ...(_a5 = r.katex) == null ? void 0 : _a5.js,
        src: s.katex.js,
        id: se.katexjs,
        onload() {
          e.current = window.katex, n(true);
        }
      }, "katex"), ue("link", {
        ...(_b3 = r.katex) == null ? void 0 : _b3.css,
        rel: "stylesheet",
        href: s.katex.css,
        id: se.katexcss
      });
    }, [
      t.noKatex
    ]), {
      katexRef: e,
      katexInited: o
    };
  }, Ve = new Uo({
    max: 1e3,
    ttl: 6e5
  }), on = (t) => {
    const { editorId: e, theme: o, rootRef: n } = a.useContext(D), { noMermaid: s, sanitizeMermaid: r } = t, i = a.useRef(Q.editorExtensions.mermaid.instance), [l, d] = a.useState(-1), u = a.useCallback(() => {
      Ve.clear();
      const c = i.current;
      !s && c && (c.initialize(Q.mermaidConfig({
        startOnLoad: false,
        theme: o === "dark" ? "dark" : "default"
      })), d((h) => h + 1));
    }, [
      s,
      o
    ]);
    a.useEffect(u, [
      u
    ]), a.useEffect(() => {
      var _a5, _b3;
      const { editorExtensions: c, editorExtensionsAttrs: h } = Q;
      if (s || i.current) return;
      const g = c.mermaid.js;
      /\.mjs/.test(g) ? (ue("link", {
        ...(_a5 = h.mermaid) == null ? void 0 : _a5.js,
        rel: "modulepreload",
        href: g,
        id: se.mermaidM
      }), import(g).then(async (m2) => {
        await m2.__tla;
        return m2;
      }).then((b) => {
        i.current = b.default, u();
      }).catch((b) => {
        E.emit(e, he, {
          name: "mermaid",
          message: `Failed to load mermaid module: ${b.message}`,
          error: b
        });
      })) : ue("script", {
        ...(_b3 = h.mermaid) == null ? void 0 : _b3.js,
        src: g,
        id: se.mermaid,
        onload() {
          i.current = window.mermaid, u();
        }
      }, "mermaid");
    }, [
      u,
      e,
      s
    ]);
    const p = a.useCallback(async () => {
      var _a5;
      if (!s && i.current) {
        const c = ((_a5 = n.current) == null ? void 0 : _a5.querySelectorAll(`div.${m}-mermaid`)) || [], h = document.createElement("div"), g = document.body.offsetWidth > 1366 ? document.body.offsetWidth : 1366, b = document.body.offsetHeight > 768 ? document.body.offsetHeight : 768;
        h.style.width = g + "px", h.style.height = b + "px", h.style.position = "fixed", h.style.zIndex = "-10000", h.style.top = "-10000";
        let x = c.length;
        x > 0 && document.body.appendChild(h), await Promise.allSettled(Array.from(c).map((v) => (async (w) => {
          var _a6;
          if (w.dataset.closed === "false") return false;
          const y = w.innerText;
          let T = Ve.get(y);
          if (!T) {
            const k = ct();
            let C = {
              svg: ""
            };
            try {
              C = await i.current.render(k, y, h), T = await r(C.svg);
              const I = document.createElement("p");
              I.className = `${m}-mermaid`, I.setAttribute("data-processed", ""), I.setAttribute("data-content", y), I.innerHTML = T, (_a6 = I.children[0]) == null ? void 0 : _a6.removeAttribute("height"), Ve.set(y, I.innerHTML), w.dataset.line !== void 0 && (I.dataset.line = w.dataset.line), w.replaceWith(I);
            } catch (I) {
              E.emit(e, he, {
                name: "mermaid",
                message: I.message,
                error: I
              });
            }
            --x === 0 && h.remove();
          }
        })(v)));
      }
    }, [
      e,
      s,
      n,
      r
    ]);
    return {
      reRender: l,
      replaceMermaid: p
    };
  }, nn = (t, e) => {
    e = e || {};
    const o = 3, n = e.marker || "!", s = n.charCodeAt(0), r = n.length;
    let i = "", l = "";
    const d = (p, c, h, g, b) => {
      const x = p[c];
      return x.type === "admonition_open" ? p[c].attrPush([
        "class",
        `${m}-admonition ${m}-admonition-${x.info}`
      ]) : x.type === "admonition_title_open" && p[c].attrPush([
        "class",
        `${m}-admonition-title`
      ]), b.renderToken(p, c, h);
    }, u = (p) => {
      const c = p.trim().split(" ", 2);
      l = "", i = c[0], c.length > 1 && (l = p.substring(i.length + 2));
    };
    t.block.ruler.before("code", "admonition", (p, c, h, g) => {
      let b, x, v, w = false, y = p.bMarks[c] + p.tShift[c], T = p.eMarks[c];
      if (s !== p.src.charCodeAt(y)) return false;
      for (b = y + 1; b <= T && n[(b - y) % r] === p.src[b]; b++) ;
      const k = Math.floor((b - y) / r);
      if (k !== o) return false;
      b -= (b - y) % r;
      const C = p.src.slice(y, b), I = p.src.slice(b, T);
      if (u(I), g) return true;
      for (x = c; x++, !(x >= h || (y = p.bMarks[x] + p.tShift[x], T = p.eMarks[x], y < T && p.sCount[x] < p.blkIndent)); ) if (s === p.src.charCodeAt(y) && !(p.sCount[x] - p.blkIndent >= 4)) {
        for (b = y + 1; b <= T && n[(b - y) % r] === p.src[b]; b++) ;
        if (!(Math.floor((b - y) / r) < k) && (b -= (b - y) % r, b = p.skipSpaces(b), !(b < T))) {
          w = true;
          break;
        }
      }
      const N = p.parentType, $ = p.lineMax;
      return p.parentType = "root", p.lineMax = x, v = p.push("admonition_open", "div", 1), v.markup = C, v.block = true, v.info = i, v.map = [
        c,
        x
      ], l && (v = p.push("admonition_title_open", "p", 1), v.markup = C + " " + i, v.map = [
        c,
        x
      ], v = p.push("inline", "", 0), v.content = l, v.map = [
        c,
        p.line - 1
      ], v.children = [], v = p.push("admonition_title_close", "p", -1), v.markup = C + " " + i), p.md.block.tokenize(p, c + 1, x), v = p.push("admonition_close", "div", -1), v.markup = p.src.slice(y, b), v.block = true, p.parentType = N, p.lineMax = $, p.line = x + (w ? 1 : 0), true;
    }, {
      alt: [
        "paragraph",
        "reference",
        "blockquote",
        "list"
      ]
    }), t.renderer.rules.admonition_open = d, t.renderer.rules.admonition_title_open = d, t.renderer.rules.admonition_title_close = d, t.renderer.rules.admonition_close = d;
  }, yt = (t, e) => {
    const o = t.attrs ? t.attrs.slice() : [];
    return e.forEach((n) => {
      const s = t.attrIndex(n[0]);
      s < 0 ? o.push(n) : (o[s] = o[s].slice(), o[s][1] += ` ${n[1]}`);
    }), o;
  }, sn = (t, e) => {
    const o = t.renderer.rules.fence, n = t.utils.unescapeAll, s = /\[(\w*)(?::([\w ]*))?\]/, r = /::(open|close)/, i = (c) => c.info ? n(c.info).trim() : "", l = (c) => {
      const h = i(c), [g = null, b = ""] = (s.exec(h) || []).slice(1);
      return [
        g,
        b
      ];
    }, d = (c) => {
      const h = i(c);
      return h ? h.split(/(\s+)/g)[0] : "";
    }, u = (c) => {
      const h = c.info.match(r) || [], g = h[1] === "open" || h[1] !== "close" && e.codeFoldable && c.content.trim().split(`
`).length < e.autoFoldThreshold, b = h[1] || e.codeFoldable ? "details" : "div", x = h[1] || e.codeFoldable ? "summary" : "div";
      return {
        open: g,
        tagContainer: b,
        tagHeader: x
      };
    }, p = (c, h, g, b, x) => {
      if (c[h].hidden) return "";
      const v = e.usedLanguageTextRef.current.copyCode.text, w = e.customIconRef.current.copy || v, y = !!e.customIconRef.current.copy, T = `<span class="${m}-collapse-tips">${me("collapse-tips", e.customIconRef.current)}</span>`, [k] = l(c[h]);
      if (k === null) {
        const { open: M, tagContainer: L, tagHeader: W } = u(c[h]), V = [
          [
            "class",
            `${m}-code`
          ]
        ];
        M && V.push([
          "open",
          ""
        ]);
        const X = {
          attrs: yt(c[h], V)
        };
        c[h].info = c[h].info.replace(r, "");
        const J = o(c, h, g, b, x);
        return `
        <${L} ${x.renderAttrs(X)}>
          <${W} class="${m}-code-head">
            <div class="${m}-code-flag"><span></span><span></span><span></span></div>
            <div class="${m}-code-action">
              <span class="${m}-code-lang">${t.utils.escapeHtml(c[h].info.trim())}</span>
              <span class="${m}-copy-button" data-tips="${v}"${y ? " data-is-icon=true" : ""}>${w}</span>
              ${e.extraTools instanceof Function ? e.extraTools({
          lang: c[h].info.trim()
        }) : e.extraTools || ""}
              ${L === "details" ? T : ""}
            </div>
          </${W}>
          ${J}
        </${L}>
      `;
      }
      let C, I, N, $, S = "", O = "", R = "";
      const { open: A, tagContainer: H, tagHeader: F } = u(c[h]), P = [
        [
          "class",
          `${m}-code`
        ]
      ];
      A && P.push([
        "open",
        ""
      ]);
      const j = {
        attrs: yt(c[h], P)
      };
      for (let M = h; M < c.length && (C = c[M], [I, N] = l(C), I === k); M++) {
        C.info = C.info.replace(s, "").replace(r, ""), C.hidden = true;
        const L = `${m}-codetab-${e.editorId}-${h}-${M - h}`;
        $ = M - h > 0 ? "" : "checked", S += `
        <li>
          <input
            type="radio"
            id="label-${m}-codetab-label-1-${e.editorId}-${h}-${M - h}"
            name="${m}-codetab-label-${e.editorId}-${h}"
            class="${L}"
            ${$}
          >
          <label
            for="label-${m}-codetab-label-1-${e.editorId}-${h}-${M - h}"
            onclick="this.getRootNode().querySelectorAll('.${L}').forEach(e => e.click())"
          >
            ${t.utils.escapeHtml(N || d(C))}
          </label>
        </li>`, O += `
        <div role="tabpanel">
          <input
            type="radio"
            name="${m}-codetab-pre-${e.editorId}-${h}"
            class="${L}"
            ${$}
            role="presentation">
          ${o(c, M, g, b, x)}
        </div>`, R += `
        <input
          type="radio"
          name="${m}-codetab-lang-${e.editorId}-${h}"
          class="${L}"
          ${$}
          role="presentation">
        <span class=${m}-code-lang role="note">${t.utils.escapeHtml(d(C))}</span>`;
      }
      return `
      <${H} ${x.renderAttrs(j)}>
        <${F} class="${m}-code-head">
          <div class="${m}-code-flag">
            <ul class="${m}-codetab-label" role="tablist">${S}</ul>
          </div>
          <div class="${m}-code-action">
            <span class="${m}-codetab-lang">${R}</span>
            <span class="${m}-copy-button" data-tips="${v}"${y ? " data-is-icon=true" : ""}>${w}</span>
            ${e.extraTools instanceof Function ? e.extraTools({
        lang: c[h].info.trim()
      }) : e.extraTools || ""}
            ${H === "details" ? T : ""}
          </div>
        </${F}>
        ${O}
      </${H}>
    `;
    };
    t.renderer.rules.fence = p, t.renderer.rules.code_block = p;
  }, an = (t, e) => {
    const o = t.renderer.rules.fence.bind(t.renderer.rules);
    t.renderer.rules.fence = (n, s, r, i, l) => {
      var _a5, _b3;
      const d = n[s], u = d.content.trim();
      if (d.info === "echarts") {
        if (d.attrSet("class", `${m}-echarts`), d.attrSet("data-echarts-theme", e.themeRef.current), d.map && d.level === 0) {
          const p = d.map[1] - 1, c = !!((_b3 = (_a5 = i.srcLines[p]) == null ? void 0 : _a5.trim()) == null ? void 0 : _b3.startsWith("```"));
          d.attrSet("data-closed", `${c}`), d.attrSet("data-line", String(d.map[0]));
        }
        return `<div ${l.renderAttrs(d)} style="width: 100%; aspect-ratio: 4 / 3;">${t.utils.escapeHtml(u)}</div>`;
      }
      return o(n, s, r, i, l);
    };
  }, ln = (t, e) => {
    t.renderer.rules.heading_open = (o, n) => {
      var _a5;
      const s = o[n], r = ((_a5 = o[n + 1].children) == null ? void 0 : _a5.reduce((l, d) => l + ([
        "text",
        "code_inline",
        "math_inline"
      ].includes(d.type) && d.content || ""), "")) || "", i = s.markup.length;
      return e.headsRef.current.push({
        text: r,
        level: i,
        line: s.map[0],
        currentToken: s,
        nextToken: o[n + 1]
      }), s.map && s.level === 0 && s.attrSet("id", e.mdHeadingId({
        text: r,
        level: i,
        index: e.headsRef.current.length,
        currentToken: s,
        nextToken: o[n + 1]
      })), t.renderer.renderToken(o, n, e);
    }, t.renderer.rules.heading_close = (o, n, s, r, i) => i.renderToken(o, n, s);
  }, qt = {
    block: [
      {
        open: "$$",
        close: "$$"
      },
      {
        open: "\\[",
        close: "\\]"
      }
    ],
    inline: [
      {
        open: "$$",
        close: "$$"
      },
      {
        open: "$",
        close: "$"
      },
      {
        open: "\\[",
        close: "\\]"
      },
      {
        open: "\\(",
        close: "\\)"
      }
    ]
  }, cn = (t) => (e, o) => {
    const n = t.delimiters;
    for (const s of n) {
      if (!e.src.startsWith(s.open, e.pos)) continue;
      const r = e.pos + s.open.length;
      let i = r;
      for (; (i = e.src.indexOf(s.close, i)) !== -1; ) {
        let l = 0, d = i - 1;
        for (; d >= 0 && e.src[d] === "\\"; ) l++, d--;
        if (l % 2 === 0) break;
        i += s.close.length;
      }
      if (i !== -1) {
        if (i - r === 0) return o || (e.pending += s.open + s.close), e.pos = i + s.close.length, true;
        if (!o) {
          const l = e.push("math_inline", "math", 0);
          l.markup = s.open, l.content = e.src.slice(r, i);
        }
        return e.pos = i + s.close.length, true;
      }
    }
    return false;
  }, dn = (t) => (e, o, n, s) => {
    const r = t.delimiters, i = e.bMarks[o] + e.tShift[o], l = e.eMarks[o], d = (u, p, c) => {
      e.line = p;
      const h = e.push("math_block", "math", 0);
      return h.block = true, h.content = u, h.map = [
        o,
        e.line
      ], h.markup = c, true;
    };
    for (const u of r) {
      const p = i;
      if (e.src.slice(p, p + u.open.length) !== u.open) continue;
      const c = p + u.open.length, h = e.src.slice(c, l).trim(), g = h === "", b = h === u.close, x = h.endsWith(u.close);
      if (!g && !b && !x) continue;
      if (s) return true;
      if (b) return d("", o + 1, u.open);
      if (!g && x) {
        const k = h.slice(0, -u.close.length);
        return d(k, o + 1, u.open);
      }
      let v = o + 1, w = false, y = "";
      for (; v < n; v++) {
        const k = e.bMarks[v] + e.tShift[v], C = e.eMarks[v];
        if (k < C && e.tShift[v] < e.blkIndent) break;
        if (e.src.slice(k, C).trim().endsWith(u.close)) {
          const I = e.src.slice(0, C).lastIndexOf(u.close);
          y = e.src.slice(k, I), w = true;
          break;
        }
      }
      if (!w) continue;
      const T = e.getLines(o + 1, v, e.tShift[o], true) + (y.trim() ? y : "");
      return d(T, v + 1, u.open);
    }
    return false;
  }, un = (t, { katexRef: e, inlineDelimiters: o, blockDelimiters: n }) => {
    const s = (l, d, u, p, c = false) => {
      const h = {
        attrs: yt(l, [
          [
            "class",
            d
          ]
        ])
      }, g = p.renderAttrs(h);
      if (!e.current) return `<${u} ${g}>${l.content}</${u}>`;
      const b = e.current.renderToString(l.content, Q.katexConfig({
        throwOnError: false,
        displayMode: c
      }));
      return `<${u} ${g} data-processed>${b}</${u}>`;
    }, r = (l, d, u, p, c) => s(l[d], `${m}-katex-inline`, "span", c), i = (l, d, u, p, c) => s(l[d], `${m}-katex-block`, "p", c, true);
    t.inline.ruler.before("escape", "math_inline", cn({
      delimiters: o || qt.inline
    })), t.block.ruler.after("blockquote", "math_block", dn({
      delimiters: n || qt.block
    }), {
      alt: [
        "paragraph",
        "reference",
        "blockquote",
        "list"
      ]
    }), t.renderer.rules.math_inline = r, t.renderer.rules.math_block = i;
  }, mn = (t, e) => {
    const o = t.renderer.rules.fence.bind(t.renderer.rules);
    t.renderer.rules.fence = (n, s, r, i, l) => {
      var _a5, _b3;
      const d = n[s], u = d.content.trim();
      if (d.info === "mermaid") {
        if (d.attrSet("class", `${m}-mermaid`), d.attrSet("data-mermaid-theme", e.themeRef.current), d.map && d.level === 0) {
          const c = d.map[1] - 1, h = !!((_b3 = (_a5 = i.srcLines[c]) == null ? void 0 : _a5.trim()) == null ? void 0 : _b3.startsWith("```"));
          d.attrSet("data-closed", `${h}`), d.attrSet("data-line", String(d.map[0]));
        }
        const p = Ve.get(u);
        return p ? (d.attrSet("data-processed", ""), d.attrSet("data-content", u), `<p ${l.renderAttrs(d)}>${p}</p>`) : `<div ${l.renderAttrs(d)}>${t.utils.escapeHtml(u)}</div>`;
      }
      return o(n, s, r, i, l);
    };
  }, Wt = (t, e, o) => {
    const n = t.attrIndex(e), s = [
      e,
      o
    ];
    n < 0 ? t.attrPush(s) : (t.attrs = t.attrs || [], t.attrs[n] = s);
  }, hn = (t) => t.type === "inline", fn = (t) => t.type === "paragraph_open", pn = (t) => t.type === "list_item_open", gn = (t) => t.content.indexOf("[ ] ") === 0 || t.content.indexOf("[x] ") === 0 || t.content.indexOf("[X] ") === 0, bn = (t, e) => hn(t[e]) && fn(t[e - 1]) && pn(t[e - 2]) && gn(t[e]), vn = (t, e) => {
    const o = t[e].level - 1;
    for (let n = e - 1; n >= 0; n--) if (t[n].level === o) return n;
    return -1;
  }, xn = (t) => {
    const e = new t("html_inline", "", 0);
    return e.content = "<label>", e;
  }, yn = (t) => {
    const e = new t("html_inline", "", 0);
    return e.content = "</label>", e;
  }, wn = (t, e, o) => {
    const n = new o("html_inline", "", 0);
    return n.content = '<label class="task-list-item-label" for="' + e + '">' + t + "</label>", n.attrs = [
      {
        for: e
      }
    ], n;
  }, kn = (t, e, o) => {
    const n = new e("html_inline", "", 0), s = o.enabled ? " " : ' disabled="" ';
    return t.content.indexOf("[ ] ") === 0 ? n.content = '<input class="task-list-item-checkbox"' + s + 'type="checkbox">' : (t.content.indexOf("[x] ") === 0 || t.content.indexOf("[X] ") === 0) && (n.content = '<input class="task-list-item-checkbox" checked=""' + s + 'type="checkbox">'), n;
  }, $n = (t, e, o) => {
    if (t.children = t.children || [], t.children.unshift(kn(t, e, o)), t.children[1].content = t.children[1].content.slice(3), t.content = t.content.slice(3), o.label) if (o.labelAfter) {
      t.children.pop();
      const n = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      t.children[0].content = t.children[0].content.slice(0, -1) + ' id="' + n + '">', t.children.push(wn(t.content, n, e));
    } else t.children.unshift(xn(e)), t.children.push(yn(e));
  }, Tn = (t, e = {}) => {
    t.core.ruler.after("inline", "github-task-lists", (o) => {
      const n = o.tokens;
      for (let s = 2; s < n.length; s++) bn(n, s) && ($n(n[s], o.Token, e), Wt(n[s - 2], "class", "task-list-item" + (e.enabled ? " enabled" : " ")), Wt(n[vn(n, s - 2)], "class", "contains-task-list"));
    });
  }, Cn = (t) => {
    t.core.ruler.push("init-line-number", (e) => (e.tokens.forEach((o) => {
      o.map && (o.attrs || (o.attrs = []), o.attrs.push([
        "data-line",
        o.map[0].toString()
      ]));
    }), true));
  }, En = (t, e) => {
    var _a5;
    const { modelValue: o, sanitize: n, mdHeadingId: s, codeFoldable: r, autoFoldThreshold: i, noKatex: l, noMermaid: d, noHighlight: u, onHtmlChanged: p, onGetCatalog: c } = t, { editorConfig: h, markdownItConfig: g, markdownItPlugins: b, editorExtensions: x } = Q, { editorId: v, language: w, showCodeRowNumber: y, theme: T, usedLanguageText: k, customIcon: C, rootRef: I, setting: N } = a.useContext(D), $ = a.useRef([]), S = a.useRef(T);
    a.useEffect(() => {
      S.current = T;
    }, [
      T
    ]);
    const O = a.useRef(k);
    a.useEffect(() => {
      O.current = k;
    }, [
      k
    ]);
    const R = a.useRef(C);
    a.useEffect(() => {
      R.current = C;
    }, [
      C
    ]);
    const { hljsRef: A, hljsInited: H } = tn(t), { katexRef: F, katexInited: P } = rn(t), { reRender: j, replaceMermaid: M } = on(t), { reRenderEcharts: L, replaceEcharts: W } = en(t), [V] = a.useState(() => {
      const K = Kr({
        html: true,
        breaks: true,
        linkify: true
      });
      g(K, {
        editorId: v
      });
      const te = [
        {
          type: "image",
          plugin: Zr,
          options: {
            figcaption: true,
            classes: "md-zoom"
          }
        },
        {
          type: "admonition",
          plugin: nn,
          options: {}
        },
        {
          type: "taskList",
          plugin: Tn,
          options: {}
        },
        {
          type: "heading",
          plugin: ln,
          options: {
            mdHeadingId: s,
            headsRef: $
          }
        },
        {
          type: "code",
          plugin: sn,
          options: {
            editorId: v,
            usedLanguageTextRef: O,
            codeFoldable: r,
            autoFoldThreshold: i,
            customIconRef: R
          }
        },
        {
          type: "sub",
          plugin: Xr,
          options: {}
        },
        {
          type: "sup",
          plugin: Yr,
          options: {}
        }
      ];
      l || te.push({
        type: "katex",
        plugin: un,
        options: {
          katexRef: F
        }
      }), d || te.push({
        type: "mermaid",
        plugin: mn,
        options: {
          themeRef: S
        }
      }), t.noEcharts || te.push({
        type: "echarts",
        plugin: an,
        options: {
          themeRef: S
        }
      }), b(te, {
        editorId: v
      }).forEach((ne) => {
        K.use(ne.plugin, ne.options);
      });
      const ie = K.options.highlight;
      return K.set({
        highlight: (ne, fe, ae) => {
          if (ie) {
            const $e = ie(ne, fe, ae);
            if ($e) return $e;
          }
          let le;
          !u && A.current ? A.current.getLanguage(fe) ? le = A.current.highlight(ne, {
            language: fe,
            ignoreIllegals: true
          }).value : le = A.current.highlightAuto(ne).value : le = V.utils.escapeHtml(ne);
          const je = y ? Lo(le.replace(/^\n+|\n+$/g, ""), ne.replace(/^\n+|\n+$/g, "")) : `<span class="${m}-code-block">${le.replace(/^\n+|\n+$/g, "")}</span>`;
          return `<pre><code class="language-${fe}" language=${fe}>${je}</code></pre>`;
        }
      }), Cn(K), K;
    }), [X, J] = a.useState(`_article-key_${ct()}`), [re, oe] = a.useState(() => ($.current = [], n(V.render(o, {
      srcLines: o.split(`
`)
    })))), Z = a.useMemo(() => (u || H) && (l || P), [
      H,
      P,
      u,
      l
    ]), pe = a.useRef(true), ge = a.useCallback(() => {
      $.current = [];
      const K = n(V.render(o, {
        srcLines: o.split(`
`)
      }));
      oe(K);
    }, [
      V,
      o,
      n
    ]), de = a.useCallback(() => {
      var _a6, _b3;
      let K = () => {
      }, te = () => {
      };
      const ie = (_a6 = I.current) == null ? void 0 : _a6.querySelectorAll(`#${v} p.${m}-mermaid:not([data-closed=false])`);
      return te = Do(ie, {
        customIcon: R.current
      }), ((_b3 = x.mermaid) == null ? void 0 : _b3.enableZoom) && (K = qo(ie, {
        customIcon: R.current
      })), [
        K,
        te
      ];
    }, [
      (_a5 = x.mermaid) == null ? void 0 : _a5.enableZoom,
      v,
      I
    ]);
    return a.useEffect(() => {
      E.emit(v, Le, re), p == null ? void 0 : p(re), c == null ? void 0 : c($.current), E.emit(v, Me, $.current);
    }, [
      v,
      re,
      X,
      c,
      p
    ]), a.useEffect(() => {
      let K = () => {
      }, te = () => {
      };
      return N.preview && (M().then(() => {
        [K, te] = de();
      }), W(), E.emit(v, Me, $.current)), () => {
        K(), te();
      };
    }, [
      v,
      de,
      W,
      M,
      N.preview
    ]), a.useEffect(() => {
      if (pe.current) {
        pe.current = false;
        return;
      }
      const K = setTimeout(() => {
        ge();
      }, e ? 0 : h.renderDelay);
      return () => {
        clearTimeout(K);
      };
    }, [
      Z,
      T,
      ge,
      w,
      e,
      h.renderDelay
    ]), a.useEffect(() => {
      let K = () => {
      }, te = () => {
      };
      return M().then(() => {
        [K, te] = de();
      }), W(), () => {
        K(), te();
      };
    }, [
      de,
      re,
      X,
      j,
      M,
      L,
      W
    ]), a.useEffect(() => {
      const K = () => {
        E.emit(v, Me, $.current);
      };
      return E.on(v, {
        name: pt,
        callback: K
      }), () => {
        E.remove(v, pt, K);
      };
    }, [
      v
    ]), a.useEffect(() => {
      const K = () => {
        J(`_article-key_${ct()}`), ge();
      };
      return E.on(v, {
        name: Ze,
        callback: K
      }), () => {
        E.remove(v, Ze, K);
      };
    }, [
      v,
      ge
    ]), {
      html: re,
      key: X
    };
  }, Sn = (t, e) => {
    const { editorId: o, setting: n } = a.useContext(D);
    a.useEffect(() => t.noImgZoomIn ? void 0 : (() => {
      const s = document.querySelectorAll(`#${o}-preview img:not(.not-zoom):not(.medium-zoom-image)`), r = Xo(s, {
        background: "#00000073"
      });
      return () => {
        r.detach();
      };
    })(), [
      o,
      e,
      t.noImgZoomIn,
      n
    ]);
  }, Bt = {
    checked: {
      regexp: /- \[x\]/,
      value: "- [ ]"
    },
    unChecked: {
      regexp: /- \[\s\]/,
      value: "- [x]"
    }
  }, jn = (t, e) => {
    const { editorId: o, rootRef: n } = a.useContext(D);
    a.useEffect(() => {
      var _a5;
      const s = ((_a5 = n.current) == null ? void 0 : _a5.querySelectorAll(".task-list-item.enabled")) || [], r = (i) => {
        var _a6;
        i.preventDefault();
        const l = i.target.checked ? "unChecked" : "checked", d = (_a6 = i.target.parentElement) == null ? void 0 : _a6.dataset.line;
        if (!d) return;
        const u = Number(d), p = t.modelValue.split(`
`), c = p[Number(u)].replace(Bt[l].regexp, Bt[l].value);
        t.previewOnly ? (p[Number(u)] = c, t.onChange(p.join(`
`))) : E.emit(o, bt, u + 1, c);
      };
      return s.forEach((i) => {
        i.addEventListener("click", r);
      }), () => {
        s.forEach((i) => {
          i.removeEventListener("click", r);
        });
      };
    }, [
      o,
      e,
      t,
      n
    ]);
  }, Ln = (t, e, o) => {
    const { onRemount: n } = t, { setting: s } = a.useContext(D);
    a.useEffect(() => {
      n == null ? void 0 : n();
    }, [
      e,
      o,
      n
    ]), a.useEffect(() => {
      (s.preview || s.htmlPreview) && (n == null ? void 0 : n());
    }, [
      s.preview,
      s.htmlPreview,
      n
    ]);
  }, Vt = (t) => {
    const e = new DOMParser().parseFromString(t, "text/html");
    return Array.from(e.body.childNodes);
  }, In = (t, e) => t.nodeType !== e.nodeType ? false : t.nodeType === Node.TEXT_NODE || t.nodeType === Node.COMMENT_NODE ? t.textContent === e.textContent : t.nodeType === Node.ELEMENT_NODE ? t.outerHTML === e.outerHTML : t.isEqualNode ? t.isEqualNode(e) : false, Nn = (t, e, o) => {
    const n = Array.from(t.childNodes), s = Math.min(e.length, o.length);
    let r = -1;
    for (let l = 0; l < s; l += 1) if (!In(e[l], o[l])) {
      r = l;
      break;
    }
    if (r === -1) if (o.length > e.length) r = e.length;
    else if (e.length > o.length) r = o.length;
    else return;
    const i = Math.min(r, n.length);
    for (let l = n.length - 1; l >= i; l -= 1) n[l].remove();
    for (let l = r; l < e.length; l += 1) t.appendChild(e[l].cloneNode(true));
  }, An = ({ html: t, id: e, className: o }) => {
    const n = a.useRef(null), s = a.useRef({
      __html: t
    }), r = a.useRef(t);
    return a.useEffect(() => {
      const i = n.current;
      if (!i) return;
      const l = r.current;
      if (l === t) return;
      const d = Vt(t), u = Vt(l);
      Nn(i, d, u), r.current = t;
    }, [
      t
    ]), f.jsx("div", {
      id: e,
      className: o,
      dangerouslySetInnerHTML: s.current,
      ref: n
    });
  }, Mn = a.memo(An), zn = (t) => {
    const { previewOnly: e = false, setting: o = {
      preview: true
    }, previewComponent: n = Mn } = t, { editorId: s, previewTheme: r, showCodeRowNumber: i } = a.useContext(D), { html: l, key: d } = En(t, !!e);
    Jo(t, l, d), Sn(t, l), jn(t, l), Ln(t, l, d);
    const u = a.useMemo(() => f.jsx(n, {
      html: l,
      id: `${s}-preview`,
      className: B([
        `${m}-preview`,
        `${r || "default"}-theme`,
        i && `${m}-scrn`
      ])
    }, d), [
      n,
      s,
      l,
      d,
      r,
      i
    ]);
    return f.jsxs(f.Fragment, {
      children: [
        o.preview && (e ? u : f.jsx("div", {
          id: `${s}-preview-wrapper`,
          className: `${m}-preview-wrapper`,
          children: u
        }, "content-preview-wrapper")),
        o.htmlPreview && f.jsx("div", {
          id: `${s}-html-wrapper`,
          className: `${m}-preview-wrapper`,
          children: f.jsx("div", {
            className: `${m}-html`,
            children: l
          })
        }, "html-preview-wrapper")
      ]
    });
  }, Hr = a.memo(zn), Hn = (t, e) => {
    const { value: o, modelValue: n, onSave: s } = t, { editorId: r } = e, [i, l] = a.useState({
      buildFinished: false,
      html: ""
    });
    a.useEffect(() => {
      const d = (u) => {
        l(() => ({
          buildFinished: true,
          html: u
        }));
      };
      return E.on(r, {
        name: Le,
        callback: d
      }), () => {
        E.remove(r, Le, d);
      };
    }, [
      r
    ]), a.useEffect(() => {
      const d = () => {
        if (s) {
          const u = new Promise((p) => {
            if (i.buildFinished) p(i.html);
            else {
              const c = (h) => {
                p(h), E.remove(r, Le, c);
              };
              E.on(r, {
                name: Le,
                callback: c
              });
            }
          });
          s(o || n || "", u);
        }
      };
      return E.on(r, {
        name: Oe,
        callback: d
      }), () => {
        E.remove(r, Oe, d);
      };
    }, [
      r,
      n,
      s,
      i.buildFinished,
      i.html,
      o
    ]), a.useEffect(() => {
      l((d) => ({
        ...d,
        buildFinished: false
      }));
    }, [
      o,
      n
    ]);
  }, On = (t) => {
    const { noPrettier: e, noUploadImg: o } = t;
    a.useEffect(() => {
      const { editorExtensions: n, editorExtensionsAttrs: s } = Q, r = e || !!n.prettier.prettierInstance, i = e || !!n.prettier.parserMarkdownInstance;
      if (!(o || n.cropper.instance)) {
        const { js: l = {}, css: d = {} } = s.cropper || {};
        ue("link", {
          ...d,
          rel: "stylesheet",
          href: n.cropper.css,
          id: se.croppercss
        }), ue("script", {
          ...l,
          src: n.cropper.js,
          id: se.cropperjs
        });
      }
      if (!r) {
        const { standaloneJs: l = {} } = s.prettier || {};
        ue("script", {
          ...l,
          src: n.prettier.standaloneJs,
          id: se.prettier
        });
      }
      if (!i) {
        const { parserMarkdownJs: l = {} } = s.prettier || {};
        ue("script", {
          ...l,
          src: n.prettier.parserMarkdownJs,
          id: se.prettierMD
        });
      }
    }, [
      e,
      o
    ]);
  }, Rn = (t, e) => {
    a.useEffect(() => (E.on(t, {
      name: he,
      callback: e
    }), () => {
      E.remove(t, he, e);
    }), [
      t,
      e
    ]);
  }, Fn = (t, e) => {
    const { editorId: o } = e, { onUploadImg: n } = t;
    a.useEffect(() => {
      const s = (r, i) => {
        n == null ? void 0 : n(r, (l) => {
          E.emit(o, q, "image", {
            desc: "",
            urls: l
          }), i == null ? void 0 : i();
        });
      };
      return E.on(o, {
        name: Re,
        callback: s
      }), () => {
        E.remove(o, Re, s);
      };
    }, [
      o,
      n
    ]);
  }, _n = (t, e) => {
    const { editorId: o } = e, [n, s] = a.useState(false);
    return a.useEffect(() => {
      const r = (i) => {
        s(i === void 0 ? (l) => !l : i);
      };
      return E.on(o, {
        name: Ke,
        callback: r
      }), () => {
        E.remove(o, Ke, r);
      };
    }, [
      o
    ]), n;
  };
  let Ut = "";
  const Or = (t) => {
    const { theme: e = _.theme, previewTheme: o = _.previewTheme, codeTheme: n = _.codeTheme, language: s = _.language, codeStyleReverse: r = _.codeStyleReverse, codeStyleReverseList: i = _.codeStyleReverseList } = t, l = a.useMemo(() => {
      const u = Q.editorExtensions.highlight, p = Q.editorExtensionsAttrs.highlight, { js: c } = u, h = {
        ...ut,
        ...u.css
      }, { js: g, css: b = {} } = p || {}, x = r && i.includes(o) ? "dark" : e, v = h[n] ? h[n][x] : ut.atom[x], w = h[n] && b[n] ? b[n][x] : b.atom ? b.atom[x] : {};
      return {
        js: {
          src: c,
          ...g
        },
        css: {
          href: v,
          ...w
        }
      };
    }, [
      r,
      i,
      o,
      e,
      n
    ]), d = a.useMemo(() => {
      const u = {
        ...He,
        ...Q.editorConfig.languageUserDefined
      };
      return u[s] ? u[s] : He["zh-CN"];
    }, [
      s
    ]);
    return [
      l,
      d
    ];
  }, Pn = (t) => {
    const { preview: e = _.preview, htmlPreview: o = _.htmlPreview, pageFullscreen: n = _.pageFullscreen } = t, [s, r] = Or(t), [i, l] = a.useState({
      pageFullscreen: n,
      fullscreen: false,
      preview: e,
      htmlPreview: e ? false : o,
      previewOnly: false
    }), d = a.useRef(i), u = a.useCallback((p, c) => {
      l((h) => {
        const g = c === void 0 ? !h[p] : c, b = {
          ...h
        };
        switch (p) {
          case "preview": {
            b.htmlPreview = false, b.previewOnly = false;
            break;
          }
          case "htmlPreview": {
            b.preview = false, b.previewOnly = false;
            break;
          }
          case "previewOnly": {
            g ? !b.preview && !b.htmlPreview && (b.preview = true) : (d.current.preview || (b.preview = false), d.current.htmlPreview || (b.htmlPreview = false));
            break;
          }
        }
        return d.current[p] = g, b[p] = g, b;
      });
    }, []);
    return a.useEffect(() => {
      Ut = document.body.style.overflow;
    }, []), a.useEffect(() => {
      i.pageFullscreen || i.fullscreen ? document.body.style.overflow = "hidden" : document.body.style.overflow = Ut;
    }, [
      i.pageFullscreen,
      i.fullscreen
    ]), [
      s,
      r,
      i,
      u
    ];
  }, Dn = (t, e, o, n, s, r) => {
    const { editorId: i } = e;
    a.useEffect(() => {
      E.emit(i, Mt, n.pageFullscreen);
    }, [
      i,
      n.pageFullscreen
    ]), a.useEffect(() => {
      E.emit(i, zt, n.fullscreen);
    }, [
      i,
      n.fullscreen
    ]), a.useEffect(() => {
      E.emit(i, Ht, n.preview);
    }, [
      i,
      n.preview
    ]), a.useEffect(() => {
      E.emit(i, Ot, n.previewOnly);
    }, [
      i,
      n.previewOnly
    ]), a.useEffect(() => {
      E.emit(i, Rt, n.htmlPreview);
    }, [
      i,
      n.htmlPreview
    ]), a.useEffect(() => {
      E.emit(i, Ft, o);
    }, [
      o,
      i
    ]), a.useImperativeHandle(t, () => ({
      on(l, d) {
        switch (l) {
          case "pageFullscreen": {
            E.on(i, {
              name: Mt,
              callback(u) {
                d(u);
              }
            });
            break;
          }
          case "fullscreen": {
            E.on(i, {
              name: zt,
              callback(u) {
                d(u);
              }
            });
            break;
          }
          case "preview": {
            E.on(i, {
              name: Ht,
              callback(u) {
                d(u);
              }
            });
            break;
          }
          case "previewOnly": {
            E.on(i, {
              name: Ot,
              callback(u) {
                d(u);
              }
            });
            break;
          }
          case "htmlPreview": {
            E.on(i, {
              name: Rt,
              callback(u) {
                d(u);
              }
            });
            break;
          }
          case "catalog": {
            E.on(i, {
              name: Ft,
              callback(u) {
                d(u);
              }
            });
            break;
          }
        }
      },
      togglePageFullscreen(l) {
        s("pageFullscreen", l);
      },
      toggleFullscreen(l) {
        E.emit(i, mt, l);
      },
      togglePreview(l) {
        s("preview", l);
      },
      togglePreviewOnly(l) {
        s("previewOnly", l);
      },
      toggleHtmlPreview(l) {
        s("htmlPreview", l);
      },
      toggleCatalog(l) {
        E.emit(i, Ke, l);
      },
      triggerSave() {
        E.emit(i, Oe);
      },
      insert(l) {
        E.emit(i, q, "universal", {
          generate: l
        });
      },
      focus(l) {
        var _a5;
        (_a5 = r.current) == null ? void 0 : _a5.focus(l);
      },
      rerender() {
        E.emit(i, Ze);
      },
      getSelectedText() {
        var _a5;
        return (_a5 = r.current) == null ? void 0 : _a5.getSelectedText();
      },
      resetHistory() {
        var _a5;
        (_a5 = r.current) == null ? void 0 : _a5.resetHistory();
      },
      domEventHandlers(l) {
        E.emit(i, gt, l);
      },
      execCommand(l) {
        E.emit(i, q, l);
      },
      getEditorView() {
        var _a5;
        return (_a5 = r.current) == null ? void 0 : _a5.getEditorView();
      }
    }), [
      r,
      i,
      s
    ]);
  }, Rr = (t) => {
    const e = a.useId();
    return t.id || t.editorId || m + "-" + e.replaceAll(":", "");
  };
  const qn = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Wn = (t) => t.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, o, n) => n ? n.toUpperCase() : o.toLowerCase()), Gt = (t) => {
    const e = Wn(t);
    return e.charAt(0).toUpperCase() + e.slice(1);
  }, Fr = (...t) => t.filter((e, o, n) => !!e && e.trim() !== "" && n.indexOf(e) === o).join(" ").trim(), Bn = (t) => {
    for (const e in t) if (e.startsWith("aria-") || e === "role" || e === "title") return true;
  };
  var Vn = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const Un = a.forwardRef(({ color: t = "currentColor", size: e = 24, strokeWidth: o = 2, absoluteStrokeWidth: n, className: s = "", children: r, iconNode: i, ...l }, d) => a.createElement("svg", {
    ref: d,
    ...Vn,
    width: e,
    height: e,
    stroke: t,
    strokeWidth: n ? Number(o) * 24 / Number(e) : o,
    className: Fr("lucide", s),
    ...!r && !Bn(l) && {
      "aria-hidden": "true"
    },
    ...l
  }, [
    ...i.map(([u, p]) => a.createElement(u, p)),
    ...Array.isArray(r) ? r : [
      r
    ]
  ]));
  const G = (t, e) => {
    const o = a.forwardRef(({ className: n, ...s }, r) => a.createElement(Un, {
      ref: r,
      iconNode: e,
      className: Fr(`lucide-${qn(Gt(t))}`, `lucide-${t}`, n),
      ...s
    }));
    return o.displayName = Gt(t), o;
  };
  const Gn = [
    [
      "path",
      {
        d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
        key: "mg9rjx"
      }
    ]
  ], Kn = G("bold", Gn);
  const Zn = [
    [
      "path",
      {
        d: "M3 3v16a2 2 0 0 0 2 2h16",
        key: "c24i48"
      }
    ],
    [
      "path",
      {
        d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
        key: "q0gr47"
      }
    ]
  ], Xn = G("chart-area", Zn);
  const Yn = [
    [
      "path",
      {
        d: "m18 16 4-4-4-4",
        key: "1inbqp"
      }
    ],
    [
      "path",
      {
        d: "m6 8-4 4 4 4",
        key: "15zrgr"
      }
    ],
    [
      "path",
      {
        d: "m14.5 4-5 16",
        key: "e7oirm"
      }
    ]
  ], Qn = G("code-xml", Yn);
  const Jn = [
    [
      "path",
      {
        d: "m16 18 6-6-6-6",
        key: "eg8j8"
      }
    ],
    [
      "path",
      {
        d: "m8 6-6 6 6 6",
        key: "ppft3o"
      }
    ]
  ], es = G("code", Jn);
  const ts = [
    [
      "path",
      {
        d: "m15 15 6 6",
        key: "1s409w"
      }
    ],
    [
      "path",
      {
        d: "m15 9 6-6",
        key: "ko1vev"
      }
    ],
    [
      "path",
      {
        d: "M21 16v5h-5",
        key: "1ck2sf"
      }
    ],
    [
      "path",
      {
        d: "M21 8V3h-5",
        key: "1qoq8a"
      }
    ],
    [
      "path",
      {
        d: "M3 16v5h5",
        key: "1t08am"
      }
    ],
    [
      "path",
      {
        d: "m3 21 6-6",
        key: "wwnumi"
      }
    ],
    [
      "path",
      {
        d: "M3 8V3h5",
        key: "1ln10m"
      }
    ],
    [
      "path",
      {
        d: "M9 9 3 3",
        key: "v551iv"
      }
    ]
  ], rs = G("expand", ts);
  const os = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "3",
        key: "1v7zrd"
      }
    ]
  ], ns = G("eye", os);
  const ss = [
    [
      "path",
      {
        d: "m15 17 5-5-5-5",
        key: "nf172w"
      }
    ],
    [
      "path",
      {
        d: "M4 18v-2a4 4 0 0 1 4-4h12",
        key: "jmiej9"
      }
    ]
  ], is = G("forward", ss);
  const as = [
    [
      "path",
      {
        d: "M6 12h12",
        key: "8npq4p"
      }
    ],
    [
      "path",
      {
        d: "M6 20V4",
        key: "1w1bmo"
      }
    ],
    [
      "path",
      {
        d: "M18 20V4",
        key: "o2hl4u"
      }
    ]
  ], ls = G("heading", as);
  const cs = [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2",
        key: "1m3agn"
      }
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "9",
        r: "2",
        key: "af1f0g"
      }
    ],
    [
      "path",
      {
        d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
        key: "1xmnt7"
      }
    ]
  ], ds = G("image", cs);
  const us = [
    [
      "line",
      {
        x1: "19",
        x2: "10",
        y1: "4",
        y2: "4",
        key: "15jd3p"
      }
    ],
    [
      "line",
      {
        x1: "14",
        x2: "5",
        y1: "20",
        y2: "20",
        key: "bu0au3"
      }
    ],
    [
      "line",
      {
        x1: "15",
        x2: "9",
        y1: "4",
        y2: "20",
        key: "uljnxc"
      }
    ]
  ], ms = G("italic", us);
  const hs = [
    [
      "path",
      {
        d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
        key: "1cjeqo"
      }
    ],
    [
      "path",
      {
        d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
        key: "19qd67"
      }
    ]
  ], fs = G("link", hs);
  const ps = [
    [
      "path",
      {
        d: "M10 12h11",
        key: "6m4ad9"
      }
    ],
    [
      "path",
      {
        d: "M10 18h11",
        key: "11hvi2"
      }
    ],
    [
      "path",
      {
        d: "M10 6h11",
        key: "c7qv1k"
      }
    ],
    [
      "path",
      {
        d: "M4 10h2",
        key: "16xx2s"
      }
    ],
    [
      "path",
      {
        d: "M4 6h1v4",
        key: "cnovpq"
      }
    ],
    [
      "path",
      {
        d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",
        key: "m9a95d"
      }
    ]
  ], gs = G("list-ordered", ps);
  const bs = [
    [
      "rect",
      {
        x: "3",
        y: "5",
        width: "6",
        height: "6",
        rx: "1",
        key: "1defrl"
      }
    ],
    [
      "path",
      {
        d: "m3 17 2 2 4-4",
        key: "1jhpwq"
      }
    ],
    [
      "path",
      {
        d: "M13 6h8",
        key: "15sg57"
      }
    ],
    [
      "path",
      {
        d: "M13 12h8",
        key: "h98zly"
      }
    ],
    [
      "path",
      {
        d: "M13 18h8",
        key: "oe0vm4"
      }
    ]
  ], vs = G("list-todo", bs);
  const xs = [
    [
      "path",
      {
        d: "M21 12h-8",
        key: "1bmf0i"
      }
    ],
    [
      "path",
      {
        d: "M21 6H8",
        key: "1pqkrb"
      }
    ],
    [
      "path",
      {
        d: "M21 18h-8",
        key: "1tm79t"
      }
    ],
    [
      "path",
      {
        d: "M3 6v4c0 1.1.9 2 2 2h3",
        key: "1ywdgy"
      }
    ],
    [
      "path",
      {
        d: "M3 10v6c0 1.1.9 2 2 2h3",
        key: "2wc746"
      }
    ]
  ], ys = G("list-tree", xs);
  const ws = [
    [
      "path",
      {
        d: "M3 12h.01",
        key: "nlz23k"
      }
    ],
    [
      "path",
      {
        d: "M3 18h.01",
        key: "1tta3j"
      }
    ],
    [
      "path",
      {
        d: "M3 6h.01",
        key: "1rqtza"
      }
    ],
    [
      "path",
      {
        d: "M8 12h13",
        key: "1za7za"
      }
    ],
    [
      "path",
      {
        d: "M8 18h13",
        key: "1lx6n3"
      }
    ],
    [
      "path",
      {
        d: "M8 6h13",
        key: "ik3vkj"
      }
    ]
  ], ks = G("list", ws);
  const $s = [
    [
      "path",
      {
        d: "M15 3h6v6",
        key: "1q9fwt"
      }
    ],
    [
      "path",
      {
        d: "m21 3-7 7",
        key: "1l2asr"
      }
    ],
    [
      "path",
      {
        d: "m3 21 7-7",
        key: "tjx5ai"
      }
    ],
    [
      "path",
      {
        d: "M9 21H3v-6",
        key: "wtvkvv"
      }
    ]
  ], Ts = G("maximize-2", $s);
  const Cs = [
    [
      "path",
      {
        d: "m14 10 7-7",
        key: "oa77jy"
      }
    ],
    [
      "path",
      {
        d: "M20 10h-6V4",
        key: "mjg0md"
      }
    ],
    [
      "path",
      {
        d: "m3 21 7-7",
        key: "tjx5ai"
      }
    ],
    [
      "path",
      {
        d: "M4 14h6v6",
        key: "rmj7iw"
      }
    ]
  ], Es = G("minimize-2", Cs);
  const Ss = [
    [
      "path",
      {
        d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
        key: "rib7q0"
      }
    ],
    [
      "path",
      {
        d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
        key: "1ymkrd"
      }
    ]
  ], js = G("quote", Ss);
  const Ls = [
    [
      "path",
      {
        d: "M20 18v-2a4 4 0 0 0-4-4H4",
        key: "5vmcpk"
      }
    ],
    [
      "path",
      {
        d: "m9 17-5-5 5-5",
        key: "nvlc11"
      }
    ]
  ], Is = G("reply", Ls);
  const Ns = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
      }
    ],
    [
      "path",
      {
        d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
        key: "1ydtos"
      }
    ],
    [
      "path",
      {
        d: "M7 3v4a1 1 0 0 0 1 1h7",
        key: "t51u73"
      }
    ]
  ], As = G("save", Ns);
  const Ms = [
    [
      "path",
      {
        d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8",
        key: "17vawe"
      }
    ],
    [
      "path",
      {
        d: "M9 19.8V15m0 0H4.2M9 15l-6 6",
        key: "chjx8e"
      }
    ],
    [
      "path",
      {
        d: "M15 4.2V9m0 0h4.8M15 9l6-6",
        key: "lav6yq"
      }
    ],
    [
      "path",
      {
        d: "M9 4.2V9m0 0H4.2M9 9 3 3",
        key: "1pxi2q"
      }
    ]
  ], zs = G("shrink", Ms);
  const Hs = [
    [
      "path",
      {
        d: "m10 9-3 3 3 3",
        key: "1oro0q"
      }
    ],
    [
      "path",
      {
        d: "m14 15 3-3-3-3",
        key: "bz13h7"
      }
    ],
    [
      "rect",
      {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        key: "h1oib"
      }
    ]
  ], Kt = G("square-code", Hs);
  const Os = [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "path",
      {
        d: "M16 8.9V7H8l4 5-4 5h8v-1.9",
        key: "9nih0i"
      }
    ]
  ], Rs = G("square-sigma", Os);
  const Fs = [
    [
      "path",
      {
        d: "M16 4H9a3 3 0 0 0-2.83 4",
        key: "43sutm"
      }
    ],
    [
      "path",
      {
        d: "M14 12a4 4 0 0 1 0 8H6",
        key: "nlfj13"
      }
    ],
    [
      "line",
      {
        x1: "4",
        x2: "20",
        y1: "12",
        y2: "12",
        key: "1e0a9i"
      }
    ]
  ], _s = G("strikethrough", Fs);
  const Ps = [
    [
      "path",
      {
        d: "m4 5 8 8",
        key: "1eunvl"
      }
    ],
    [
      "path",
      {
        d: "m12 5-8 8",
        key: "1ah0jp"
      }
    ],
    [
      "path",
      {
        d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
        key: "e8ta8j"
      }
    ]
  ], Ds = G("subscript", Ps);
  const qs = [
    [
      "path",
      {
        d: "m4 19 8-8",
        key: "hr47gm"
      }
    ],
    [
      "path",
      {
        d: "m12 19-8-8",
        key: "1dhhmo"
      }
    ],
    [
      "path",
      {
        d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
        key: "1dfcux"
      }
    ]
  ], Ws = G("superscript", qs);
  const Bs = [
    [
      "path",
      {
        d: "M12 3v18",
        key: "108xh3"
      }
    ],
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "path",
      {
        d: "M3 9h18",
        key: "1pudct"
      }
    ],
    [
      "path",
      {
        d: "M3 15h18",
        key: "5xshup"
      }
    ]
  ], Vs = G("table", Bs);
  const Us = [
    [
      "path",
      {
        d: "M10 11v6",
        key: "nco0om"
      }
    ],
    [
      "path",
      {
        d: "M14 11v6",
        key: "outv1u"
      }
    ],
    [
      "path",
      {
        d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
        key: "miytrc"
      }
    ],
    [
      "path",
      {
        d: "M3 6h18",
        key: "d0wm0j"
      }
    ],
    [
      "path",
      {
        d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        key: "e791ji"
      }
    ]
  ], Gs = G("trash-2", Us);
  const Ks = [
    [
      "path",
      {
        d: "M6 4v6a6 6 0 0 0 12 0V4",
        key: "9kb039"
      }
    ],
    [
      "line",
      {
        x1: "4",
        x2: "20",
        y1: "20",
        y2: "20",
        key: "nun2al"
      }
    ]
  ], Zs = G("underline", Ks);
  const Xs = [
    [
      "path",
      {
        d: "M12 3v12",
        key: "1x0j5s"
      }
    ],
    [
      "path",
      {
        d: "m17 8-5-5-5 5",
        key: "7q97r8"
      }
    ],
    [
      "path",
      {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
        key: "ih7n3h"
      }
    ]
  ], Ys = G("upload", Xs);
  const Qs = [
    [
      "path",
      {
        d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2",
        key: "mrq65r"
      }
    ],
    [
      "path",
      {
        d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2",
        key: "be3xqs"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "1",
        key: "41hilf"
      }
    ],
    [
      "path",
      {
        d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
        key: "11ak4c"
      }
    ]
  ], Js = G("view", Qs);
  const ei = [
    [
      "path",
      {
        d: "M18 6 6 18",
        key: "1bl5f8"
      }
    ],
    [
      "path",
      {
        d: "m6 6 12 12",
        key: "d8bk6v"
      }
    ]
  ], ti = G("x", ei), ri = (t) => f.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `lucide lucide-github-icon ${t.className}`,
    children: [
      f.jsx("path", {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }),
      f.jsx("path", {
        d: "M9 18c-4.51 2-5-2-7-2"
      })
    ]
  }), oi = {
    bold: Kn,
    underline: Zs,
    italic: ms,
    "strike-through": _s,
    title: ls,
    sub: Ds,
    sup: Ws,
    quote: js,
    "unordered-list": ks,
    "ordered-list": gs,
    task: vs,
    "code-row": es,
    code: Kt,
    link: fs,
    image: ds,
    table: Vs,
    revoke: Is,
    next: is,
    save: As,
    prettier: Kt,
    minimize: Es,
    maximize: Ts,
    "fullscreen-exit": zs,
    fullscreen: rs,
    "preview-only": Js,
    preview: ns,
    "preview-html": Qn,
    catalog: ys,
    github: ri,
    mermaid: Xn,
    formula: Rs,
    close: ti,
    delete: Gs,
    upload: Ys
  }, ni = (t) => a.createElement(oi[t.name], {
    className: `${m}-icon`
  }), si = a.memo(ni), U = (t) => {
    const { customIcon: e } = a.useContext(D), o = e[t.name];
    if (typeof o == "object") {
      const n = o.component;
      return typeof n == "function" ? f.jsx(n, {
        ...o.props
      }) : f.jsx("span", {
        dangerouslySetInnerHTML: {
          __html: o.component
        }
      });
    }
    return f.jsx(si, {
      name: t.name
    });
  }, ii = `${m}-modal-container`, ai = (t) => {
    const { theme: e, rootRef: o } = a.useContext(D), { onClose: n = () => {
    }, onAdjust: s = () => {
    }, style: r = {}, showMask: i = true } = t, [l, d] = a.useState(t.visible), [u, p] = a.useState([
      `${m}-modal`
    ]), c = a.useRef(null), h = a.useRef(null), g = a.useRef(null), b = a.useRef(null), [x, v] = a.useState({
      maskStyle: {
        zIndex: -1
      },
      modalStyle: {
        zIndex: -1
      },
      initPos: {
        insetInlineStart: "0px",
        insetBlockStart: "0px"
      },
      historyPos: {
        insetInlineStart: "0px",
        insetBlockStart: "0px"
      }
    }), w = a.useMemo(() => t.isFullscreen ? {
      width: "100%",
      height: "100%"
    } : {
      width: t.width,
      height: t.height
    }, [
      t.height,
      t.isFullscreen,
      t.width
    ]);
    return a.useEffect(() => {
      var _a5;
      const y = (_a5 = o == null ? void 0 : o.current) == null ? void 0 : _a5.getRootNode();
      return g.current = y instanceof Document ? document.body : y, () => {
        g.current = null;
      };
    }, [
      o
    ]), a.useEffect(() => {
      let y = () => {
      };
      return !t.isFullscreen && t.visible && (y = Fo(h.current, (T, k) => {
        v((C) => ({
          ...C,
          initPos: {
            insetInlineStart: T + "px",
            insetBlockStart: k + "px"
          }
        }));
      })), y;
    }, [
      t.isFullscreen,
      t.visible
    ]), a.useEffect(() => {
      if (l) {
        const y = c.current.offsetWidth / 2, T = c.current.offsetHeight / 2, k = document.documentElement.clientWidth / 2, C = document.documentElement.clientHeight / 2;
        v((I) => ({
          ...I,
          maskStyle: {
            zIndex: Q.editorConfig.zIndex + At()
          },
          modalStyle: {
            zIndex: Q.editorConfig.zIndex + At()
          },
          initPos: {
            insetInlineStart: k - y + "px",
            insetBlockStart: C - T + "px"
          }
        }));
      }
    }, [
      l
    ]), a.useEffect(() => {
      const y = t.visible;
      y ? (p(() => [
        `${m}-modal`,
        "zoom-in"
      ]), d(y)) : (p(() => [
        `${m}-modal`,
        "zoom-out"
      ]), setTimeout(() => {
        d(y);
      }, 150));
    }, [
      t.visible
    ]), f.jsx(f.Fragment, {
      children: g.current && Ur.createPortal(f.jsx("div", {
        ref: b,
        className: ii,
        "data-theme": e,
        children: f.jsxs("div", {
          className: t.className,
          style: {
            ...r,
            display: l ? "block" : "none"
          },
          children: [
            i && f.jsx("div", {
              className: `${m}-modal-mask`,
              style: x.maskStyle,
              onClick: n
            }),
            f.jsxs("div", {
              className: u.join(" "),
              style: {
                ...x.modalStyle,
                ...x.initPos,
                ...w
              },
              ref: c,
              children: [
                f.jsx("div", {
                  className: `${m}-modal-header`,
                  ref: h,
                  children: t.title || ""
                }),
                f.jsxs("div", {
                  className: `${m}-modal-func`,
                  children: [
                    t.showAdjust && f.jsx("div", {
                      className: `${m}-modal-adjust`,
                      onClick: (y) => {
                        y.stopPropagation(), t.isFullscreen ? v((T) => ({
                          ...T,
                          initPos: T.historyPos
                        })) : v((T) => ({
                          ...T,
                          historyPos: T.initPos,
                          initPos: {
                            insetInlineStart: "0",
                            insetBlockStart: "0"
                          }
                        })), s instanceof Function && s(!t.isFullscreen);
                      },
                      children: f.jsx(U, {
                        name: t.isFullscreen ? "minimize" : "maximize"
                      })
                    }),
                    f.jsx("div", {
                      className: `${m}-modal-close`,
                      onClick: (y) => {
                        y.stopPropagation(), t.onClose && t.onClose();
                      },
                      children: f.jsx(U, {
                        name: "close"
                      })
                    })
                  ]
                }),
                f.jsx("div", {
                  className: `${m}-modal-body`,
                  children: t.children
                })
              ]
            })
          ]
        })
      }), g.current)
    });
  }, St = a.memo(ai), Zt = `${m}-dropdown-hidden`, li = (t) => {
    const { relative: e = "html", onChange: o, disabled: n } = t, [s, r] = a.useState({
      overlayClass: Zt,
      overlayStyle: {}
    }), i = a.useRef({
      triggerHover: false,
      overlayHover: false
    }), l = a.useRef(null), d = a.useRef(null), u = a.useCallback(() => {
      var _a5, _b3;
      if (n) return false;
      i.current.triggerHover = true;
      const w = l.current, y = d.current;
      if (!w || !y) return;
      const T = w.getBoundingClientRect(), k = w.offsetTop, C = w.offsetLeft, I = T.height, N = T.width, $ = w.getRootNode(), S = ((_a5 = $.querySelector(e)) == null ? void 0 : _a5.scrollLeft) || 0, O = ((_b3 = $.querySelector(e)) == null ? void 0 : _b3.clientWidth) || 0;
      let R = C - y.offsetWidth / 2 + N / 2 - S;
      R + y.offsetWidth > S + O && (R = S + O - y.offsetWidth), R < 0 && (R = 0), r((A) => ({
        ...A,
        overlayStyle: {
          insetBlockStart: k + I + "px",
          insetInlineStart: R + "px"
        }
      })), o(true);
    }, [
      n,
      o,
      e
    ]), p = a.useCallback(() => {
      if (n) return false;
      i.current.overlayHover = true;
    }, [
      n
    ]), c = a.useRef(-1), h = a.useCallback((w) => {
      var _a5;
      if (n) return false;
      ((_a5 = l.current) == null ? void 0 : _a5.contains(w.target)) ? i.current.triggerHover = false : i.current.overlayHover = false, clearTimeout(c.current), c.current = window.setTimeout(() => {
        !i.current.overlayHover && !i.current.triggerHover && o(false);
      }, 10);
    }, [
      n,
      o
    ]), g = t.children, b = t.overlay, x = a.cloneElement(g, {
      ref: l,
      key: "cloned-dropdown-trigger"
    });
    a.useEffect(() => {
      t.visible ? r((w) => ({
        ...w,
        overlayClass: ""
      })) : r((w) => ({
        ...w,
        overlayClass: Zt
      }));
    }, [
      t.visible
    ]), a.useEffect(() => {
      const w = l.current, y = d.current;
      return w == null ? void 0 : w.addEventListener("mouseenter", u), w == null ? void 0 : w.addEventListener("mouseleave", h), y == null ? void 0 : y.addEventListener("mouseenter", p), y == null ? void 0 : y.addEventListener("mouseleave", h), () => {
        w == null ? void 0 : w.removeEventListener("mouseenter", u), w == null ? void 0 : w.removeEventListener("mouseleave", h), y == null ? void 0 : y.removeEventListener("mouseenter", p), y == null ? void 0 : y.removeEventListener("mouseleave", h);
      };
    }, [
      h,
      p,
      u
    ]);
    const v = f.jsx("div", {
      className: `${m}-dropdown ${s.overlayClass}`,
      style: s.overlayStyle,
      ref: d,
      children: f.jsx("div", {
        className: `${m}-dropdown-overlay`,
        children: b instanceof Array ? b[0] : b
      })
    });
    return f.jsxs(f.Fragment, {
      children: [
        x,
        v
      ]
    });
  }, Se = a.memo(li), ci = (t) => {
    const e = a.useRef(null), o = a.useRef(null), n = a.useRef(null), s = a.useRef(null), r = a.useRef(false), i = a.useRef(0), l = a.useRef(0), d = a.useCallback(() => {
      if (!o.current || !e.current || !n.current || !s.current) return;
      const x = e.current.clientHeight, v = o.current.scrollHeight, w = o.current.scrollTop;
      if (v <= x) {
        n.current.style.display = "none", t.alwaysShowTrack || (s.current.style.display = "none");
        return;
      } else n.current.style.display = "block", s.current.style.display = "block";
      const y = x / v, T = Math.max(x * y, 20), k = x - T, C = Math.min(w * y, k);
      n.current.style.height = `${T}px`, n.current.style.top = `${C}px`;
    }, [
      t.alwaysShowTrack
    ]), u = d, p = a.useCallback((x) => {
      r.current = true, i.current = x.clientY, l.current = o.current.scrollTop, document.body.style.userSelect = "none";
    }, []), c = a.useCallback((x) => {
      if (!r.current || !o.current || !e.current) return;
      const v = x.clientY - i.current, w = o.current.scrollHeight / e.current.clientHeight;
      o.current.scrollTop = l.current + v * w;
    }, [
      l,
      i
    ]), h = a.useCallback(() => {
      r.current = false, document.body.style.userSelect = "";
    }, []), g = a.useCallback((x) => {
      o.current && o.current.removeEventListener("scroll", u), o.current = x, o.current ? (o.current.addEventListener("scroll", u), d()) : s.current && !t.alwaysShowTrack && (s.current.style.display = "none");
    }, [
      u,
      t.alwaysShowTrack,
      d
    ]), b = a.useCallback(() => {
      if (!e.current) return;
      const x = t.scrollTarget ? e.current.querySelector(t.scrollTarget) : e.current.firstElementChild;
      g(x);
    }, [
      g,
      t.scrollTarget
    ]);
    return a.useEffect(() => {
      b();
      const x = n.current;
      let v = null;
      const w = new MutationObserver(() => {
        v && cancelAnimationFrame(v), v = requestAnimationFrame(() => {
          b();
        });
      });
      return w.observe(e.current, {
        childList: true,
        subtree: true
      }), window.addEventListener("resize", d), x == null ? void 0 : x.addEventListener("mousedown", p), document.addEventListener("mousemove", c), document.addEventListener("mouseup", h), () => {
        w == null ? void 0 : w.disconnect(), o.current && o.current.removeEventListener("scroll", u), window.removeEventListener("resize", d), x == null ? void 0 : x.removeEventListener("mousedown", p), document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", h);
      };
    }, [
      b,
      p,
      c,
      h,
      u,
      d
    ]), f.jsxs("div", {
      id: t.id,
      className: B([
        `${m}-custom-scrollbar`,
        t.className
      ]),
      style: t.style,
      ref: e,
      onMouseEnter: t.onMouseEnter,
      onMouseLeave: t.onMouseLeave,
      children: [
        t.children,
        f.jsx("div", {
          className: `${m}-custom-scrollbar__track`,
          ref: s,
          children: f.jsx("div", {
            className: `${m}-custom-scrollbar__thumb`,
            ref: n
          })
        })
      ]
    });
  }, et = a.memo(ci), di = (t, e, o) => {
    const { editorId: n, setting: s } = a.useContext(D), [r, i] = a.useState({
      clear() {
      },
      init() {
      }
    });
    a.useEffect(() => {
      var _a5;
      const l = (_a5 = o.current) == null ? void 0 : _a5.view.contentDOM.getRootNode(), d = l == null ? void 0 : l.querySelector(`#${n} .cm-scroller`), u = l == null ? void 0 : l.querySelector(`[id="${n}-preview-wrapper"]`), p = l == null ? void 0 : l.querySelector(`[id="${n}-html-wrapper"]`);
      if (u || p) {
        const c = u ? zo : Mo, h = u || p, [g, b] = c(d, h, o.current);
        i({
          init: g,
          clear: b
        });
      }
    }, [
      e,
      s.fullscreen,
      s.pageFullscreen,
      s.preview,
      s.htmlPreview,
      n,
      o
    ]), a.useEffect(() => (t.scrollAuto && !s.previewOnly && (s.preview || s.htmlPreview) ? r.init() : r.clear(), () => {
      r.clear();
    }), [
      r,
      t.scrollAuto,
      s.preview,
      s.htmlPreview,
      s.previewOnly
    ]);
  }, tt = async (t, e, o) => {
    if (/^h[1-6]$/.test(t)) return ui(t, e);
    if (t === "prettier") return await mi(e, o);
    switch (t) {
      case "bold":
      case "underline":
      case "italic":
      case "strikeThrough":
      case "sub":
      case "sup":
      case "codeRow":
      case "katexInline":
      case "katexBlock":
        return fi(t, e);
      case "quote":
      case "orderedList":
      case "unorderedList":
      case "task":
        return gi(t, e);
      case "code":
        return bi(o, e);
      case "table":
        return yi(o);
      case "link": {
        const n = e.getSelectedText(), { desc: s = n, url: r = "" } = o, i = `[${s}](${r})`;
        return {
          text: i,
          options: {
            select: r === "",
            deviationStart: i.length - r.length - 1,
            deviationEnd: -1
          }
        };
      }
      case "image":
        return xi(o, e);
      case "flow":
      case "sequence":
      case "gantt":
      case "class":
      case "state":
      case "pie":
      case "relationship":
      case "journey":
        return vi(t);
      case "universal":
        return wi(e.getSelectedText(), o);
      default:
        return {
          text: "",
          options: {}
        };
    }
  }, ui = (t, e) => {
    const o = t.slice(1), n = "#".repeat(Number(o)), [s, r, i] = jt(e, {
      wholeLine: true
    });
    return {
      text: `${n} ${s}`,
      options: {
        deviationStart: n.length + 1,
        replaceStart: r,
        replaceEnd: i
      }
    };
  }, mi = async (t, e) => {
    var _a5, _b3, _c3;
    const o = window.prettier || ((_a5 = Q.editorExtensions.prettier) == null ? void 0 : _a5.prettierInstance), n = [
      ((_b3 = window.prettierPlugins) == null ? void 0 : _b3.markdown) || ((_c3 = Q.editorExtensions.prettier) == null ? void 0 : _c3.parserMarkdownInstance)
    ];
    return !o || !n[0] ? (E.emit(e.editorId, he, {
      name: "prettier",
      message: "prettier is undefined"
    }), {
      text: t.getValue(),
      options: {
        select: false,
        replaceAll: true
      }
    }) : {
      text: await o.format(t.getValue(), {
        parser: "markdown",
        plugins: n
      }),
      options: {
        select: false,
        replaceAll: true
      }
    };
  }, hi = {
    bold: [
      "**",
      "**",
      2,
      -2
    ],
    underline: [
      "<u>",
      "</u>",
      3,
      -4
    ],
    italic: [
      "*",
      "*",
      1,
      -1
    ],
    strikeThrough: [
      "~~",
      "~~",
      2,
      -2
    ],
    sub: [
      "~",
      "~",
      1,
      -1
    ],
    sup: [
      "^",
      "^",
      1,
      -1
    ],
    codeRow: [
      "`",
      "`",
      1,
      -1
    ],
    katexInline: [
      "$",
      "$",
      1,
      -1
    ],
    katexBlock: [
      `
$$
`,
      `
$$
`,
      4,
      -4
    ]
  }, fi = (t, e) => {
    const o = e.getSelectedText(), [n, s, r, i] = hi[t];
    return {
      text: `${n}${o}${s}`,
      options: {
        deviationStart: r,
        deviationEnd: i
      }
    };
  }, pi = {
    quote: "> ",
    unorderedList: "- ",
    orderedList: 1,
    task: "- [ ] "
  }, gi = (t, e) => {
    const [o, n, s] = jt(e, {
      wholeLine: true
    }), r = o.split(`
`), i = pi[t], l = t === "orderedList" ? r.map((p, c) => `${i + c}. ${p}`) : r.map((p) => `${i}${p}`), d = t === "orderedList" ? "1. " : i.toString(), u = r.length === 1 ? d.length : 0;
    return {
      text: l.join(`
`),
      options: {
        deviationStart: u,
        replaceStart: n,
        replaceEnd: s
      }
    };
  }, bi = (t, e) => {
    const [o, n, s] = jt(e), r = t.mode || "language", i = `
\`\`\`${r}
${t.text || o || ""}
\`\`\`
`;
    return {
      text: i,
      options: {
        deviationStart: 4,
        deviationEnd: 4 + r.length - i.length,
        replaceStart: n,
        replaceEnd: s
      }
    };
  }, vi = (t) => ({
    text: `
\`\`\`mermaid
${{
      flow: `flowchart TD 
  Start --> Stop`,
      sequence: `sequenceDiagram
  A->>B: hello!
  B-->>A: hi!`,
      gantt: `gantt
title Gantt Chart
dateFormat  YYYY-MM-DD`,
      class: `classDiagram
  class Animal`,
      state: `stateDiagram-v2
  s1 --> s2`,
      pie: `pie
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15`,
      relationship: `erDiagram
  CAR ||--o{ NAMED-DRIVER : allows`,
      journey: `journey
  title My Journey`,
      ...Q.editorConfig.mermaidTemplate
    }[t]}
\`\`\`
`,
    options: {
      deviationStart: 12,
      deviationEnd: -5
    }
  }), xi = (t, e) => {
    const o = e.getSelectedText(), { desc: n = o, url: s = "", urls: r } = t;
    let i = "";
    const l = s === "" && (!r || r instanceof Array && r.length === 0);
    return r instanceof Array ? i = r.reduce((d, u) => {
      const { url: p = "", alt: c = "", title: h = "" } = typeof u == "object" ? u : {
        url: u
      };
      return d + `![${c}](${p}${h ? " '" + h + "'" : ""})
`;
    }, "") : i = `![${n}](${s})
`, {
      text: i,
      options: {
        select: s === "",
        deviationStart: l ? i.length - s.length - 2 : i.length,
        deviationEnd: l ? -2 : 0
      }
    };
  }, yi = (t) => {
    const { selectedShape: e = {
      x: 1,
      y: 1
    } } = t, { x: o, y: n } = e;
    let s = `
| Column`;
    for (let r = 0; r <= n; r++) s += " |";
    s += `
|`;
    for (let r = 0; r <= n; r++) s += " - |";
    for (let r = 0; r <= o; r++) {
      s += `
|`;
      for (let i = 0; i <= n; i++) s += " |";
    }
    return s += `
`, {
      text: s,
      options: {
        deviationStart: 3,
        deviationEnd: 10 - s.length
      }
    };
  }, wi = (t, e) => {
    const { generate: o } = e, n = o(t);
    return {
      text: n.targetValue,
      options: {
        select: n.select ?? true,
        deviationStart: n.deviationStart || 0,
        deviationEnd: n.deviationEnd || 0
      }
    };
  }, jt = (t, e = {
    wholeLine: false
  }) => {
    const o = t.view.state, n = o.selection.main;
    if (n.empty) {
      const s = o.doc.lineAt(n.from);
      return [
        o.doc.lineAt(n.from).text,
        s.from,
        s.to
      ];
    } else if (e.wholeLine) {
      const s = o.doc.lineAt(n.from), r = o.doc.lineAt(n.to);
      return [
        o.doc.sliceString(s.from, r.to),
        s.from,
        r.to
      ];
    }
    return [
      o.doc.sliceString(n.from, n.to),
      n.from,
      n.to
    ];
  }, Ce = (t) => {
    const e = new ye();
    return (o) => (e.get(t.state) ? t.dispatch({
      effects: e.reconfigure(o)
    }) : t.dispatch({
      effects: Ue.appendConfig.of(e.of(o))
    }), true);
  };
  class ki {
    constructor(e) {
      __publicField(this, "view");
      __publicField(this, "maxLength", Number.MAX_SAFE_INTEGER);
      __publicField(this, "toggleTabSize");
      __publicField(this, "togglePlaceholder");
      __publicField(this, "setExtensions");
      __publicField(this, "toggleDisabled");
      __publicField(this, "toggleReadOnly");
      __publicField(this, "toggleMaxlength");
      this.view = e, this.toggleTabSize = Ce(this.view), this.togglePlaceholder = Ce(this.view), this.setExtensions = Ce(this.view), this.toggleDisabled = Ce(this.view), this.toggleReadOnly = Ce(this.view), this.toggleMaxlength = Ce(this.view);
    }
    getValue() {
      return this.view.state.doc.toString();
    }
    setValue(e, o = 0, n = this.view.state.doc.length) {
      this.view.dispatch({
        changes: {
          from: o,
          to: n,
          insert: e
        }
      });
    }
    getSelectedText() {
      const { from: e, to: o } = this.view.state.selection.main;
      return this.view.state.sliceDoc(e, o);
    }
    replaceSelectedText(e, o, n) {
      const s = {
        select: true,
        deviationStart: 0,
        deviationEnd: 0,
        replaceAll: false,
        replaceStart: -1,
        replaceEnd: -1,
        ...o
      };
      try {
        if (s.replaceAll) {
          if (this.setValue(e), e.length > this.maxLength) throw new Error("The input text is too long");
          return;
        }
        if (this.view.state.doc.length - this.getSelectedText().length + e.length > this.maxLength) throw new Error("The input text is too long");
        const { from: r } = this.view.state.selection.main;
        s.replaceStart !== -1 ? this.view.dispatch({
          changes: {
            from: s.replaceStart,
            to: s.replaceEnd,
            insert: e
          }
        }) : this.view.dispatch(this.view.state.replaceSelection(e)), s.select && this.view.dispatch({
          selection: {
            anchor: s.replaceStart === -1 ? r + s.deviationStart : s.replaceStart + s.deviationStart,
            head: s.replaceStart === -1 ? r + e.length + s.deviationEnd : s.replaceStart + e.length + s.deviationEnd
          }
        }), this.view.focus();
      } catch (r) {
        if (r.message === "The input text is too long") E.emit(n, he, {
          name: "overlength",
          message: r.message,
          data: e
        });
        else throw r;
      }
    }
    setTabSize(e) {
      this.toggleTabSize([
        Je.tabSize.of(e),
        lo.of(" ".repeat(e))
      ]);
    }
    setPlaceholder(e) {
      this.togglePlaceholder(co(e));
    }
    focus(e) {
      if (this.view.focus(), !e) return;
      let o = 0, n = 0, s = 0;
      switch (e) {
        case "start":
          break;
        case "end": {
          o = n = s = this.getValue().length;
          break;
        }
        default:
          o = e.rangeAnchor || e.cursorPos, n = e.rangeHead || e.cursorPos, s = e.cursorPos;
      }
      this.view.dispatch({
        scrollIntoView: true,
        selection: ke.create([
          ke.range(o, n),
          ke.cursor(s)
        ], 1)
      });
    }
    setDisabled(e) {
      this.toggleDisabled([
        ce.editable.of(!e)
      ]);
    }
    setReadOnly(e) {
      this.toggleReadOnly([
        Je.readOnly.of(e)
      ]);
    }
    setMaxLength(e) {
      this.maxLength = e, this.toggleMaxlength([
        Je.changeFilter.of((o) => o.newDoc.length <= e)
      ]);
    }
  }
  const $i = (t, e) => {
    const { editorId: o } = a.useContext(D), n = a.useCallback((s) => {
      s instanceof Promise ? s.then((r) => {
        E.emit(o, q, "universal", {
          generate() {
            return {
              targetValue: r
            };
          }
        });
      }).catch((r) => {
        console.error(r);
      }) : E.emit(o, q, "universal", {
        generate() {
          return {
            targetValue: s
          };
        }
      });
    }, [
      o
    ]);
    return a.useCallback((s) => {
      var _a5, _b3, _c3;
      if (!s.clipboardData) return;
      if (s.clipboardData.files.length > 0) {
        const { files: c } = s.clipboardData;
        E.emit(o, Re, Array.from(c).filter((h) => /image\/.*/.test(h.type))), s.preventDefault();
        return;
      }
      const r = s.clipboardData.getData("text/plain"), i = ((_a5 = e.current) == null ? void 0 : _a5.view.state.selection.main.to) || 0, l = ((_b3 = e.current) == null ? void 0 : _b3.view.state.doc.lineAt(i).from) || 0, d = ((_c3 = e.current) == null ? void 0 : _c3.view.state.doc.sliceString(l, i)) || "", u = /!\[.*\]\(\s*$/.test(d), p = /!\[.*\]\((.*)\s?.*\)/.test(r);
      if (u) {
        const c = t.transformImgUrl(r);
        n(c), s.preventDefault();
        return;
      } else if (p) {
        const c = r.match(new RegExp(`(?<=!\\[.*\\]\\()([^)\\s]+)(?=\\s?["']?.*["']?\\))`, "g"));
        c ? Promise.all(c.map((h) => t.transformImgUrl(h))).then((h) => {
          n(h.reduce((g, b, x) => g.replace(c[x], b), r));
        }).catch((h) => {
          console.error(h);
        }) : n(r), s.preventDefault();
        return;
      }
      if (t.autoDetectCode && s.clipboardData.types.includes("vscode-editor-data")) {
        const c = JSON.parse(s.clipboardData.getData("vscode-editor-data"));
        E.emit(o, q, "code", {
          mode: c.mode,
          text: s.clipboardData.getData("text/plain")
        }), s.preventDefault();
        return;
      }
      t.maxLength && r.length + t.modelValue.length > t.maxLength && E.emit(o, he, {
        name: "overlength",
        message: "The input text is too long",
        data: r
      });
    }, [
      e,
      o,
      n,
      t
    ]);
  }, De = (t, e, o, n, s) => (r, i, l, d) => {
    const u = `${t}${e}${o}${n}`, p = l + i.label.length + (s === "title" ? o.length : 0);
    r.dispatch({
      changes: {
        from: l,
        to: d,
        insert: u
      },
      selection: ke.create([
        ke.range(l + i.label.length + (s === "title" ? 1 : -e.length), p),
        ke.cursor(p)
      ], 1)
    }), r.focus();
  }, Xt = (t) => (e, o, n, s) => {
    const r = t.slice(s - n);
    e.dispatch(e.state.replaceSelection(`${r} `));
  }, Yt = (t) => {
    const e = (o) => {
      const n = o.matchBefore(/^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|\$\$?|!+\s*\w*/);
      return n === null || n.from == n.to && o.explicit ? null : {
        from: n.from,
        options: [
          ...[
            "h2",
            "h3",
            "h4",
            "h5",
            "h6"
          ].map((s, r) => {
            const i = new Array(r + 2).fill("#").join("");
            return {
              label: i,
              type: "text",
              apply: Xt(i)
            };
          }),
          ...[
            "unchecked",
            "checked"
          ].map((s) => {
            const r = s === "checked" ? "- [x]" : "- [ ]";
            return {
              label: r,
              type: "text",
              apply: Xt(r)
            };
          }),
          ...[
            [
              "`",
              ""
            ],
            [
              "```",
              "language"
            ],
            [
              "```mermaid\n",
              ""
            ],
            [
              "```echarts\n",
              ""
            ]
          ].map((s) => ({
            label: `${s[0]}${s[1]}`,
            type: "text",
            apply: De(s[0], s[1], "", s[0] === "`" ? "`" : "\n```", "type")
          })),
          {
            label: "[]()",
            type: "text"
          },
          {
            label: "![]()",
            type: "text"
          },
          {
            label: "| |",
            type: "text",
            detail: "table",
            apply: `| col | col | col |
| - | - | - |
| content | content | content |
| content | content | content |`
          },
          {
            label: "$",
            type: "text",
            apply: De("$", "", "", "$", "type")
          },
          {
            label: "$$",
            type: "text",
            apply: De("$$", "", `
`, `
$$`, "title")
          },
          ...[
            "note",
            "abstract",
            "info",
            "tip",
            "success",
            "question",
            "warning",
            "failure",
            "danger",
            "bug",
            "example",
            "quote",
            "hint",
            "caution",
            "error",
            "attention"
          ].map((s) => ({
            label: `!!! ${s}`,
            type: "text",
            apply: De("!!!", ` ${s}`, " Title", `

!!!`, "title")
          }))
        ]
      };
    };
    return io({
      override: t ? [
        e,
        ...t
      ] : [
        e
      ]
    });
  }, Ti = (t, e) => [
    {
      key: "Ctrl-b",
      mac: "Cmd-b",
      run: () => (E.emit(t, q, "bold"), true)
    },
    {
      key: "Ctrl-d",
      mac: "Cmd-d",
      run: no,
      preventDefault: true
    },
    {
      key: "Ctrl-s",
      mac: "Cmd-s",
      run: (o) => (E.emit(t, Oe, o.state.doc.toString()), true),
      shift: () => (E.emit(t, q, "strikeThrough"), true)
    },
    {
      key: "Ctrl-u",
      mac: "Cmd-u",
      preventDefault: true,
      run: () => (E.emit(t, q, "underline"), true),
      shift: () => (E.emit(t, q, "unorderedList"), true)
    },
    {
      key: "Ctrl-i",
      mac: "Cmd-i",
      preventDefault: true,
      run: () => (E.emit(t, q, "italic"), true),
      shift: () => (E.emit(t, q, "image"), true)
    },
    {
      key: "Ctrl-1",
      mac: "Cmd-1",
      run: () => (E.emit(t, q, "h1"), true)
    },
    {
      key: "Ctrl-2",
      mac: "Cmd-2",
      run: () => (E.emit(t, q, "h2"), true)
    },
    {
      key: "Ctrl-3",
      mac: "Cmd-3",
      run: () => (E.emit(t, q, "h3"), true)
    },
    {
      key: "Ctrl-4",
      mac: "Cmd-4",
      run: () => (E.emit(t, q, "h4"), true)
    },
    {
      key: "Ctrl-5",
      mac: "Cmd-5",
      run: () => (E.emit(t, q, "h5"), true)
    },
    {
      key: "Ctrl-6",
      mac: "Cmd-6",
      run: () => (E.emit(t, q, "h6"), true)
    },
    {
      key: "Ctrl-ArrowUp",
      mac: "Cmd-ArrowUp",
      run: () => (E.emit(t, q, "sup"), true)
    },
    {
      key: "Ctrl-ArrowDown",
      mac: "Cmd-ArrowDown",
      run: () => (E.emit(t, q, "sub"), true)
    },
    {
      key: "Ctrl-o",
      mac: "Cmd-o",
      run: () => (E.emit(t, q, "orderedList"), true)
    },
    {
      key: "Ctrl-c",
      mac: "Cmd-c",
      shift: () => (E.emit(t, q, "code"), true),
      any(o, n) {
        return (n.ctrlKey || n.metaKey) && n.altKey && n.code === "KeyC" ? (E.emit(t, q, "codeRow"), true) : false;
      }
    },
    {
      key: "Ctrl-l",
      mac: "Cmd-l",
      run: () => (E.emit(t, q, "link"), true)
    },
    {
      key: "Ctrl-f",
      mac: "Cmd-f",
      shift: () => e.noPrettier ? false : (E.emit(t, q, "prettier"), true)
    },
    {
      any: (o, n) => (n.ctrlKey || n.metaKey) && n.altKey && n.shiftKey && n.code === "KeyT" ? (E.emit(t, q, "table"), true) : false
    },
    ...so
  ], Ci = () => f.jsx("div", {
    className: `${m}-divider`
  }), Ei = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.bold,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.bold,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "bold");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "bold"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.bold
        })
      ]
    });
  }, Si = a.memo(Ei), ji = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n, catalogVisible: s } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        s && `${m}-toolbar-active`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.catalog,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.catalog,
      disabled: n,
      onClick: () => {
        E.emit(t, Ke);
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "catalog"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.catalog
        })
      ]
    }, "bar-catalog");
  }, Li = a.memo(ji), Ii = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.code,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.code,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "code");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "code"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.code
        })
      ]
    });
  }, Ni = a.memo(Ii), Ai = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.codeRow,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.codeRow,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "codeRow");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "code-row"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.codeRow
        })
      ]
    });
  }, Mi = a.memo(Ai), zi = () => {
    var _a5, _b3, _c3;
    const { setting: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D), { fullscreenHandler: s } = Fa();
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        t.fullscreen && `${m}-toolbar-active`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.fullscreen,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.fullscreen,
      disabled: n,
      onClick: () => {
        s();
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: t.fullscreen ? "fullscreen-exit" : "fullscreen"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.fullscreen
        })
      ]
    });
  }, Hi = a.memo(zi), Oi = () => {
    var _a5, _b3, _c3;
    const { usedLanguageText: t, showToolbarName: e, disabled: o } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        o && `${m}-disabled`
      ]),
      title: (_a5 = t.toolbarTips) == null ? void 0 : _a5.github,
      "aria-label": (_b3 = t.toolbarTips) == null ? void 0 : _b3.github,
      disabled: o,
      onClick: () => {
        vo("https://github.com/imzbf/md-editor-rt");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "github"
        }),
        e && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = t.toolbarTips) == null ? void 0 : _c3.github
        })
      ]
    });
  }, Ri = a.memo(Oi), Fi = () => {
    var _a5, _b3, _c3;
    const { usedLanguageText: t, setting: e, updateSetting: o, showToolbarName: n, disabled: s } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        e.htmlPreview && `${m}-toolbar-active`,
        s && `${m}-disabled`
      ]),
      title: (_a5 = t.toolbarTips) == null ? void 0 : _a5.htmlPreview,
      "aria-label": (_b3 = t.toolbarTips) == null ? void 0 : _b3.htmlPreview,
      disabled: s,
      onClick: () => {
        o("htmlPreview");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "preview-html"
        }),
        n && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = t.toolbarTips) == null ? void 0 : _c3.htmlPreview
        })
      ]
    });
  }, _i = a.memo(Fi), Pi = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.image,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.image,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "image");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "image"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.image
        })
      ]
    });
  }, Di = a.memo(Pi);
  let ve = null;
  const qi = (t) => {
    var _a5, _b3, _c3;
    const e = a.useContext(D), { editorId: o, usedLanguageText: n, rootRef: s } = e, r = Q.editorExtensions.cropper.instance, i = a.useRef(null), l = a.useRef(null), d = a.useRef(null), [u, p] = a.useState({
      cropperInited: false,
      imgSelected: false,
      imgSrc: "",
      isFullscreen: false
    });
    a.useEffect(() => {
      t.visible && !u.cropperInited && (window.Cropper = r || window.Cropper, i.current.onchange = () => {
        if (!window.Cropper) {
          E.emit(o, he, {
            name: "Cropper",
            message: "Cropper is undefined"
          });
          return;
        }
        const b = i.current.files || [];
        if ((b == null ? void 0 : b.length) > 0) {
          const x = new FileReader();
          x.onload = (v) => {
            p((w) => ({
              ...w,
              imgSelected: true,
              imgSrc: v.target.result
            }));
          }, x.readAsDataURL(b[0]);
        }
      });
    }, [
      t.visible,
      u.cropperInited,
      r,
      o
    ]), a.useEffect(() => {
      var _a6;
      (_a6 = d.current) == null ? void 0 : _a6.setAttribute("style", "");
    }, [
      u.imgSelected
    ]), a.useEffect(() => {
      var _a6, _b4;
      ve == null ? void 0 : ve.destroy(), (_a6 = d.current) == null ? void 0 : _a6.setAttribute("style", ""), l.current && u.imgSrc && (ve = new window.Cropper(l.current, {
        viewMode: 2,
        preview: ((_b4 = s.current) == null ? void 0 : _b4.getRootNode()).querySelector(`.${m}-clip-preview-target`)
      }));
    }, [
      u.imgSrc,
      u.isFullscreen,
      s
    ]);
    const c = a.useMemo(() => u.isFullscreen ? {
      width: "100%",
      height: "100%"
    } : {
      width: "668px",
      height: "392px"
    }, [
      u.isFullscreen
    ]), h = () => {
      ve.clear(), ve.destroy(), ve = null, i.current.value = "", p((b) => ({
        ...b,
        imgSrc: "",
        imgSelected: false
      }));
    }, g = a.useCallback((b) => {
      p((x) => ({
        ...x,
        isFullscreen: b
      }));
    }, []);
    return a.useMemo(() => {
      var _a6, _b4, _c4;
      return f.jsxs(St, {
        className: `${m}-modal-clip`,
        title: (_a6 = n.clipModalTips) == null ? void 0 : _a6.title,
        visible: t.visible,
        onClose: t.onCancel,
        showAdjust: true,
        isFullscreen: u.isFullscreen,
        onAdjust: g,
        ...c,
        children: [
          f.jsxs("div", {
            className: `${m}-form-item ${m}-clip`,
            children: [
              f.jsx("div", {
                className: `${m}-clip-main`,
                children: u.imgSelected ? f.jsxs("div", {
                  className: `${m}-clip-cropper`,
                  children: [
                    f.jsx("img", {
                      src: u.imgSrc,
                      ref: l,
                      style: {
                        display: "none"
                      },
                      alt: ""
                    }),
                    f.jsx("div", {
                      className: `${m}-clip-delete`,
                      onClick: h,
                      children: f.jsx(U, {
                        name: "delete"
                      })
                    })
                  ]
                }) : f.jsx("div", {
                  className: `${m}-clip-upload`,
                  onClick: () => {
                    i.current.click();
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-label": (_b4 = n.imgTitleItem) == null ? void 0 : _b4.upload,
                  children: f.jsx(U, {
                    name: "upload"
                  })
                })
              }),
              f.jsx("div", {
                className: `${m}-clip-preview`,
                children: f.jsx("div", {
                  className: `${m}-clip-preview-target`,
                  ref: d
                })
              })
            ]
          }),
          f.jsx("div", {
            className: `${m}-form-item`,
            children: f.jsx("button", {
              className: `${m}-btn`,
              type: "button",
              onClick: () => {
                if (ve) {
                  const b = ve.getCroppedCanvas();
                  E.emit(o, Re, [
                    jo(b.toDataURL("image/png"))
                  ], t.onOk), h();
                }
              },
              children: (_c4 = n.linkModalTips) == null ? void 0 : _c4.buttonOK
            })
          }),
          f.jsx("input", {
            ref: i,
            accept: "image/*",
            type: "file",
            multiple: false,
            style: {
              display: "none"
            },
            "aria-hidden": "true"
          })
        ]
      });
    }, [
      (_a5 = n.clipModalTips) == null ? void 0 : _a5.title,
      (_b3 = n.linkModalTips) == null ? void 0 : _b3.buttonOK,
      (_c3 = n.imgTitleItem) == null ? void 0 : _c3.upload,
      t.visible,
      t.onCancel,
      t.onOk,
      u.isFullscreen,
      u.imgSelected,
      u.imgSrc,
      g,
      c,
      o
    ]);
  }, Wi = a.memo(qi), Bi = (t) => f.jsx(Wi, {
    visible: t.clipVisible,
    onOk: t.onOk,
    onCancel: t.onCancel
  }), Vi = a.memo(Bi), Ui = () => {
    var _a5, _b3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D), s = `${t}-toolbar-wrapper`, [r, i] = a.useState(false), [l, d] = a.useState(false), u = a.useRef(null), p = a.useCallback(() => {
      var _a6;
      E.emit(t, Re, Array.from(((_a6 = u.current) == null ? void 0 : _a6.files) || [])), u.current.value = "";
    }, [
      t
    ]), c = a.useCallback((v, w) => {
      n || E.emit(t, q, v, w);
    }, [
      t,
      n
    ]), h = a.useCallback(() => {
      d(false);
    }, []), g = a.useCallback((v) => {
      v && c("image", {
        desc: v.desc,
        url: v.url,
        transform: true
      }), d(false);
    }, [
      c
    ]), b = a.useMemo(() => {
      var _a6, _b4, _c3;
      const v = [
        {
          key: "link",
          label: (_a6 = e.imgTitleItem) == null ? void 0 : _a6.link,
          onClick: () => c("image")
        },
        {
          key: "upload",
          label: (_b4 = e.imgTitleItem) == null ? void 0 : _b4.upload,
          onClick: () => {
            var _a7;
            return (_a7 = u.current) == null ? void 0 : _a7.click();
          }
        },
        {
          key: "clip",
          label: (_c3 = e.imgTitleItem) == null ? void 0 : _c3.clip2upload,
          onClick: () => d(true)
        }
      ];
      return f.jsx("ul", {
        className: `${m}-menu`,
        onClick: () => {
          i(false);
        },
        role: "menu",
        children: v.map((w) => f.jsx("li", {
          className: `${m}-menu-item ${m}-menu-item-image`,
          onClick: w.onClick,
          role: "menuitem",
          tabIndex: 0,
          children: w.label
        }, w.key))
      });
    }, [
      c,
      e.imgTitleItem
    ]), x = a.useMemo(() => {
      var _a6, _b4, _c3;
      return f.jsxs("button", {
        className: B([
          `${m}-toolbar-item`,
          n && `${m}-disabled`
        ]),
        title: (_a6 = e.toolbarTips) == null ? void 0 : _a6.image,
        "aria-label": (_b4 = e.toolbarTips) == null ? void 0 : _b4.image,
        disabled: n,
        type: "button",
        children: [
          f.jsx(U, {
            name: "image"
          }),
          o && f.jsx("div", {
            className: `${m}-toolbar-item-name`,
            children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.image
          })
        ]
      });
    }, [
      n,
      o,
      (_a5 = e.toolbarTips) == null ? void 0 : _a5.image
    ]);
    return a.useEffect(() => {
      const v = u.current;
      return v == null ? void 0 : v.addEventListener("change", p), () => {
        v == null ? void 0 : v.removeEventListener("change", p);
      };
    }, [
      p
    ]), f.jsxs(f.Fragment, {
      children: [
        f.jsx("label", {
          htmlFor: `${s}_label`,
          style: {
            display: "none"
          },
          "aria-label": (_b3 = e.imgTitleItem) == null ? void 0 : _b3.upload
        }),
        f.jsx("input", {
          id: `${s}_label`,
          ref: u,
          accept: "image/*",
          type: "file",
          multiple: true,
          style: {
            display: "none"
          }
        }),
        f.jsx(Vi, {
          clipVisible: l,
          onCancel: h,
          onOk: g
        }),
        f.jsx(Se, {
          relative: `#${s}`,
          visible: r,
          onChange: i,
          disabled: n,
          overlay: b,
          children: x
        })
      ]
    });
  }, Gi = a.memo(Ui), Ki = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.italic,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.italic,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "italic");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "italic"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.italic
        })
      ]
    });
  }, Zi = a.memo(Ki), Xi = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D), s = `${t}-toolbar-wrapper`, [r, i] = a.useState(false), l = a.useCallback((p) => {
      n || E.emit(t, q, p);
    }, [
      n,
      t
    ]), d = a.useMemo(() => {
      var _a6, _b4;
      return f.jsxs("ul", {
        className: `${m}-menu`,
        onClick: () => {
          i(false);
        },
        role: "menu",
        children: [
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-katex`,
            onClick: () => {
              l("katexInline");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_a6 = e.katex) == null ? void 0 : _a6.inline
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-katex`,
            onClick: () => {
              l("katexBlock");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_b4 = e.katex) == null ? void 0 : _b4.block
          })
        ]
      });
    }, [
      l,
      (_a5 = e.katex) == null ? void 0 : _a5.block,
      (_b3 = e.katex) == null ? void 0 : _b3.inline
    ]), u = a.useMemo(() => {
      var _a6, _b4, _c4;
      return f.jsxs("button", {
        className: B([
          `${m}-toolbar-item`,
          n && `${m}-disabled`
        ]),
        title: (_a6 = e.toolbarTips) == null ? void 0 : _a6.katex,
        "aria-label": (_b4 = e.toolbarTips) == null ? void 0 : _b4.katex,
        disabled: n,
        type: "button",
        children: [
          f.jsx(U, {
            name: "formula"
          }),
          o && f.jsx("div", {
            className: `${m}-toolbar-item-name`,
            children: (_c4 = e.toolbarTips) == null ? void 0 : _c4.katex
          })
        ]
      });
    }, [
      n,
      o,
      (_c3 = e.toolbarTips) == null ? void 0 : _c3.katex
    ]);
    return f.jsx(Se, {
      relative: `#${s}`,
      visible: r,
      onChange: i,
      disabled: n,
      overlay: d,
      children: u
    }, "bar-katex");
  }, Yi = a.memo(Xi), Qi = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.link,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.link,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "link");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "link"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.link
        })
      ]
    });
  }, Ji = a.memo(Qi), ea = () => {
    var _a5, _b3, _c3, _d3, _e4, _f2, _g2, _h2, _i3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D), s = `${t}-toolbar-wrapper`, [r, i] = a.useState(false), l = a.useCallback((p) => {
      n || E.emit(t, q, p);
    }, [
      n,
      t
    ]), d = a.useMemo(() => {
      var _a6, _b4, _c4, _d4, _e5, _f3, _g3, _h3;
      return f.jsxs("ul", {
        className: `${m}-menu`,
        onClick: () => {
          i(false);
        },
        role: "menu",
        children: [
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("flow");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_a6 = e.mermaid) == null ? void 0 : _a6.flow
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("sequence");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_b4 = e.mermaid) == null ? void 0 : _b4.sequence
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("gantt");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_c4 = e.mermaid) == null ? void 0 : _c4.gantt
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("class");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_d4 = e.mermaid) == null ? void 0 : _d4.class
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("state");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_e5 = e.mermaid) == null ? void 0 : _e5.state
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("pie");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_f3 = e.mermaid) == null ? void 0 : _f3.pie
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("relationship");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_g3 = e.mermaid) == null ? void 0 : _g3.relationship
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-mermaid`,
            onClick: () => {
              l("journey");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_h3 = e.mermaid) == null ? void 0 : _h3.journey
          })
        ]
      });
    }, [
      l,
      (_a5 = e.mermaid) == null ? void 0 : _a5.class,
      (_b3 = e.mermaid) == null ? void 0 : _b3.flow,
      (_c3 = e.mermaid) == null ? void 0 : _c3.gantt,
      (_d3 = e.mermaid) == null ? void 0 : _d3.journey,
      (_e4 = e.mermaid) == null ? void 0 : _e4.pie,
      (_f2 = e.mermaid) == null ? void 0 : _f2.relationship,
      (_g2 = e.mermaid) == null ? void 0 : _g2.sequence,
      (_h2 = e.mermaid) == null ? void 0 : _h2.state
    ]), u = a.useMemo(() => {
      var _a6, _b4, _c4;
      return f.jsxs("button", {
        className: B([
          `${m}-toolbar-item`,
          n && `${m}-disabled`
        ]),
        title: (_a6 = e.toolbarTips) == null ? void 0 : _a6.mermaid,
        "aria-label": (_b4 = e.toolbarTips) == null ? void 0 : _b4.mermaid,
        disabled: n,
        type: "button",
        children: [
          f.jsx(U, {
            name: "mermaid"
          }),
          o && f.jsx("div", {
            className: `${m}-toolbar-item-name`,
            children: (_c4 = e.toolbarTips) == null ? void 0 : _c4.mermaid
          })
        ]
      });
    }, [
      n,
      o,
      (_i3 = e.toolbarTips) == null ? void 0 : _i3.mermaid
    ]);
    return f.jsx(Se, {
      relative: `#${s}`,
      visible: r,
      onChange: i,
      disabled: n,
      overlay: d,
      children: u
    }, "bar-mermaid");
  }, ta = a.memo(ea), ra = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.next,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.next,
      disabled: n,
      onClick: () => {
        E.emit(t, ft);
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "next"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.next
        })
      ]
    });
  }, oa = a.memo(ra), na = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.orderedList,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.orderedList,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "orderedList");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "ordered-list"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.orderedList
        })
      ]
    });
  }, sa = a.memo(na), ia = () => {
    var _a5, _b3, _c3;
    const { setting: t, usedLanguageText: e, updateSetting: o, showToolbarName: n, disabled: s } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        t.pageFullscreen && `${m}-toolbar-active`,
        s && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.pageFullscreen,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.pageFullscreen,
      disabled: s,
      onClick: () => {
        o("pageFullscreen");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: t.pageFullscreen ? "minimize" : "maximize"
        }),
        n && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.pageFullscreen
        })
      ]
    });
  }, aa = a.memo(ia), la = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.prettier,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.prettier,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "prettier");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "prettier"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.prettier
        })
      ]
    });
  }, ca = a.memo(la), da = () => {
    var _a5, _b3, _c3;
    const { usedLanguageText: t, showToolbarName: e, disabled: o, setting: n, updateSetting: s } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n.preview && `${m}-toolbar-active`,
        o && `${m}-disabled`
      ]),
      title: (_a5 = t.toolbarTips) == null ? void 0 : _a5.preview,
      "aria-label": (_b3 = t.toolbarTips) == null ? void 0 : _b3.preview,
      disabled: o,
      onClick: () => {
        s("preview");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "preview"
        }),
        e && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = t.toolbarTips) == null ? void 0 : _c3.preview
        })
      ]
    });
  }, ua = a.memo(da), ma = () => {
    var _a5, _b3, _c3;
    const { usedLanguageText: t, showToolbarName: e, disabled: o, setting: n, updateSetting: s } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n.previewOnly && `${m}-toolbar-active`,
        o && `${m}-disabled`
      ]),
      title: (_a5 = t.toolbarTips) == null ? void 0 : _a5.previewOnly,
      "aria-label": (_b3 = t.toolbarTips) == null ? void 0 : _b3.previewOnly,
      disabled: o,
      onClick: () => {
        s("previewOnly");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "preview-only"
        }),
        e && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = t.toolbarTips) == null ? void 0 : _c3.previewOnly
        })
      ]
    });
  }, ha = a.memo(ma), fa = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.quote,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.quote,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "quote");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "quote"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.quote
        })
      ]
    });
  }, pa = a.memo(fa), ga = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.revoke,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.revoke,
      disabled: n,
      onClick: () => {
        E.emit(t, ht);
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "revoke"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.revoke
        })
      ]
    });
  }, ba = a.memo(ga), va = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.save,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.save,
      disabled: n,
      onClick: () => {
        E.emit(t, Oe);
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "save"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.save
        })
      ]
    });
  }, xa = a.memo(va), ya = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.strikeThrough,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.strikeThrough,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "strikeThrough");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "strike-through"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.strikeThrough
        })
      ]
    });
  }, wa = a.memo(ya), ka = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.sub,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.sub,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "sub");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "sub"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.sub
        })
      ]
    });
  }, $a = a.memo(ka), Ta = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.sup,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.sup,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "sup");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "sup"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.sup
        })
      ]
    });
  }, Ca = a.memo(Ta), Ea = (t) => {
    const [e, o] = a.useState({
      x: -1,
      y: -1
    }), n = a.useMemo(() => JSON.stringify(t.tableShape), [
      t.tableShape
    ]), s = a.useCallback(() => {
      const l = [
        ...JSON.parse(n)
      ];
      return (!l[2] || l[2] < l[0]) && (l[2] = l[0]), (!l[3] || l[3] < l[3]) && (l[3] = l[1]), l;
    }, [
      n
    ]), [r, i] = a.useState(s);
    return a.useEffect(() => {
      i(s), o({
        x: -1,
        y: -1
      });
    }, [
      s
    ]), f.jsx("div", {
      className: `${m}-table-shape`,
      onMouseLeave: () => {
        i(s), o({
          x: -1,
          y: -1
        });
      },
      children: new Array(r[1]).fill("").map((l, d) => f.jsx("div", {
        className: `${m}-table-shape-row`,
        children: new Array(r[0]).fill("").map((u, p) => f.jsx("div", {
          className: `${m}-table-shape-col`,
          onMouseEnter: () => {
            o({
              x: d,
              y: p
            }), p + 1 === r[0] && p + 1 < r[2] ? i((c) => {
              const h = [
                ...c
              ];
              return h[0] = c[0] + 1, h;
            }) : p + 2 < r[0] && r[0] > t.tableShape[0] && i((c) => {
              const h = [
                ...c
              ];
              return h[0] = c[0] - 1, h;
            }), d + 1 === r[1] && d + 1 < r[3] ? i((c) => {
              const h = [
                ...c
              ];
              return h[1] = c[1] + 1, h;
            }) : d + 2 < r[1] && r[1] > t.tableShape[1] && i((c) => {
              const h = [
                ...c
              ];
              return h[1] = c[1] - 1, h;
            });
          },
          onClick: () => {
            t.onSelected(e);
          },
          children: f.jsx("div", {
            className: [
              `${m}-table-shape-col-default`,
              d <= e.x && p <= e.y && `${m}-table-shape-col-include`
            ].filter((c) => !!c).join(" ")
          })
        }, `table-shape-col-${p}`))
      }, `table-shape-row-${d}`))
    });
  }, Sa = a.memo(Ea), ja = () => {
    var _a5;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n, tableShape: s } = a.useContext(D), r = `${t}-toolbar-wrapper`, [i, l] = a.useState(false), d = a.useCallback((c) => {
      n || E.emit(t, q, "table", {
        selectedShape: c
      });
    }, [
      n,
      t
    ]), u = a.useMemo(() => f.jsx(Sa, {
      tableShape: s,
      onSelected: d
    }), [
      d,
      s
    ]), p = a.useMemo(() => {
      var _a6, _b3, _c3;
      return f.jsxs("button", {
        className: B([
          `${m}-toolbar-item`,
          n && `${m}-disabled`
        ]),
        title: (_a6 = e.toolbarTips) == null ? void 0 : _a6.table,
        "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.table,
        disabled: n,
        type: "button",
        children: [
          f.jsx(U, {
            name: "table"
          }),
          o && f.jsx("div", {
            className: `${m}-toolbar-item-name`,
            children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.table
          })
        ]
      });
    }, [
      n,
      o,
      (_a5 = e.toolbarTips) == null ? void 0 : _a5.table
    ]);
    return f.jsx(Se, {
      relative: `#${r}`,
      visible: i,
      onChange: l,
      disabled: n,
      overlay: u,
      children: p
    }, "bar-table");
  }, La = a.memo(ja), Ia = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.task,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.task,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "task");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "task"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.task
        })
      ]
    });
  }, Na = a.memo(Ia), Aa = () => {
    var _a5, _b3, _c3, _d3, _e4, _f2, _g2;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D), s = `${t}-toolbar-wrapper`, [r, i] = a.useState(false), l = a.useCallback((p) => {
      n || E.emit(t, q, p);
    }, [
      n,
      t
    ]), d = a.useMemo(() => {
      var _a6, _b4, _c4, _d4, _e5, _f3;
      return f.jsxs("ul", {
        className: `${m}-menu`,
        onClick: () => {
          i(false);
        },
        role: "menu",
        children: [
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h1");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_a6 = e.titleItem) == null ? void 0 : _a6.h1
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h2");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_b4 = e.titleItem) == null ? void 0 : _b4.h2
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h3");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_c4 = e.titleItem) == null ? void 0 : _c4.h3
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h4");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_d4 = e.titleItem) == null ? void 0 : _d4.h4
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h5");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_e5 = e.titleItem) == null ? void 0 : _e5.h5
          }),
          f.jsx("li", {
            className: `${m}-menu-item ${m}-menu-item-title`,
            onClick: () => {
              l("h6");
            },
            role: "menuitem",
            tabIndex: 0,
            children: (_f3 = e.titleItem) == null ? void 0 : _f3.h6
          })
        ]
      });
    }, [
      l,
      (_a5 = e.titleItem) == null ? void 0 : _a5.h1,
      (_b3 = e.titleItem) == null ? void 0 : _b3.h2,
      (_c3 = e.titleItem) == null ? void 0 : _c3.h3,
      (_d3 = e.titleItem) == null ? void 0 : _d3.h4,
      (_e4 = e.titleItem) == null ? void 0 : _e4.h5,
      (_f2 = e.titleItem) == null ? void 0 : _f2.h6
    ]), u = a.useMemo(() => {
      var _a6, _b4, _c4;
      return f.jsxs("button", {
        className: B([
          `${m}-toolbar-item`,
          n && `${m}-disabled`
        ]),
        disabled: n,
        title: (_a6 = e.toolbarTips) == null ? void 0 : _a6.title,
        "aria-label": (_b4 = e.toolbarTips) == null ? void 0 : _b4.title,
        type: "button",
        children: [
          f.jsx(U, {
            name: "title"
          }),
          o && f.jsx("div", {
            className: `${m}-toolbar-item-name`,
            children: (_c4 = e.toolbarTips) == null ? void 0 : _c4.title
          })
        ]
      });
    }, [
      n,
      o,
      (_g2 = e.toolbarTips) == null ? void 0 : _g2.title
    ]);
    return f.jsx(Se, {
      relative: `#${s}`,
      visible: r,
      onChange: i,
      disabled: n,
      overlay: d,
      children: u
    });
  }, Ma = a.memo(Aa), za = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.underline,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.underline,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "underline");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "underline"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.underline
        })
      ]
    });
  }, Ha = a.memo(za), Oa = () => {
    var _a5, _b3, _c3;
    const { editorId: t, usedLanguageText: e, showToolbarName: o, disabled: n } = a.useContext(D);
    return f.jsxs("button", {
      className: B([
        `${m}-toolbar-item`,
        n && `${m}-disabled`
      ]),
      title: (_a5 = e.toolbarTips) == null ? void 0 : _a5.unorderedList,
      "aria-label": (_b3 = e.toolbarTips) == null ? void 0 : _b3.unorderedList,
      disabled: n,
      onClick: () => {
        E.emit(t, q, "unorderedList");
      },
      type: "button",
      children: [
        f.jsx(U, {
          name: "unordered-list"
        }),
        o && f.jsx("div", {
          className: `${m}-toolbar-item-name`,
          children: (_c3 = e.toolbarTips) == null ? void 0 : _c3.unorderedList
        })
      ]
    });
  }, Ra = a.memo(Oa), Fa = () => {
    const { editorId: t, updateSetting: e } = a.useContext(D), o = a.useRef(Q.editorExtensions.screenfull.instance), n = a.useRef(false), s = a.useCallback((r) => {
      if (!o.current) {
        E.emit(t, he, {
          name: "fullscreen",
          message: "fullscreen is undefined"
        });
        return;
      }
      o.current.isEnabled ? (n.current = !n.current, (r === void 0 ? !o.current.isFullscreen : r) ? o.current.request() : o.current.exit()) : console.error("browser does not support screenfull!");
    }, [
      t
    ]);
    return a.useEffect(() => {
      const r = () => {
        e("fullscreen", n.current);
      };
      let i = -1;
      if (!o.current) {
        const { editorExtensions: l, editorExtensionsAttrs: d } = Q;
        i = requestAnimationFrame(() => {
          var _a5;
          ue("script", {
            ...(_a5 = d.screenfull) == null ? void 0 : _a5.js,
            src: l.screenfull.js,
            id: se.screenfull,
            onload() {
              o.current = window.screenfull, o.current && o.current.isEnabled && o.current.on("change", r);
            }
          }, "screenfull");
        });
      }
      return o.current && o.current.isEnabled && o.current.on("change", r), () => {
        o.current || cancelAnimationFrame(i), o.current && o.current.isEnabled && o.current.off("change", r);
      };
    }, [
      e
    ]), a.useEffect(() => (E.on(t, {
      name: mt,
      callback: s
    }), () => {
      E.remove(t, mt, s);
    }), [
      t,
      s
    ]), {
      fullscreenHandler: s
    };
  }, _r = () => {
    const { editorId: t, theme: e, previewTheme: o, language: n, disabled: s, noUploadImg: r, noPrettier: i, codeTheme: l, showToolbarName: d, setting: u, defToolbars: p } = a.useContext(D);
    return {
      barRender: a.useCallback((c, h) => {
        var _a5, _b3, _c3, _d3, _e4, _f2;
        if (Ct.includes(c)) {
          const g = `bar-divider-${h ?? t}`;
          switch (c) {
            case "-":
              return f.jsx(Ci, {}, g);
            case "bold":
              return f.jsx(Si, {}, "bar-bold");
            case "underline":
              return f.jsx(Ha, {}, "bar-unorderline");
            case "italic":
              return f.jsx(Zi, {}, "bar-italic");
            case "strikeThrough":
              return f.jsx(wa, {}, "bar-strikeThrough");
            case "title":
              return f.jsx(Ma, {}, "bar-title");
            case "sub":
              return f.jsx($a, {}, "bar-sub");
            case "sup":
              return f.jsx(Ca, {}, "bar-sup");
            case "quote":
              return f.jsx(pa, {}, "bar-quote");
            case "unorderedList":
              return f.jsx(Ra, {}, "bar-unorderedList");
            case "orderedList":
              return f.jsx(sa, {}, "bar-orderedList");
            case "task":
              return f.jsx(Na, {}, "bar-task");
            case "codeRow":
              return f.jsx(Mi, {}, "bar-codeRow");
            case "code":
              return f.jsx(Ni, {}, "bar-code");
            case "link":
              return f.jsx(Ji, {}, "bar-link");
            case "image":
              return r ? f.jsx(Di, {}, "bar-image") : f.jsx(Gi, {}, "bar-imageDropdown");
            case "table":
              return f.jsx(La, {}, "bar-table");
            case "revoke":
              return f.jsx(ba, {}, "bar-revoke");
            case "next":
              return f.jsx(oa, {}, "bar-next");
            case "save":
              return f.jsx(xa, {}, "bar-save");
            case "prettier":
              return !i && f.jsx(ca, {}, "bar-prettier");
            case "pageFullscreen":
              return !u.fullscreen && f.jsx(aa, {}, "bar-pageFullscreen");
            case "fullscreen":
              return f.jsx(Hi, {}, "bar-fullscreen");
            case "catalog":
              return f.jsx(Li, {}, "bar-catalog");
            case "preview":
              return f.jsx(ua, {}, "bar-preview");
            case "previewOnly":
              return f.jsx(ha, {}, "bar-previewOnly");
            case "htmlPreview":
              return f.jsx(_i, {}, "bar-htmlPreview");
            case "github":
              return f.jsx(Ri, {}, "bar-github");
            case "mermaid":
              return f.jsx(ta, {}, "bar-mermaid");
            case "katex":
              return f.jsx(Yi, {}, "bar-katex");
            default:
              return null;
          }
        }
        if (p) {
          const g = p[c];
          if (g) return a.cloneElement(g, {
            theme: ((_a5 = g.props) == null ? void 0 : _a5.theme) || e,
            codeTheme: ((_b3 = g.props) == null ? void 0 : _b3.codeTheme) || l,
            previewTheme: ((_c3 = g.props) == null ? void 0 : _c3.previewTheme) || o,
            language: ((_d3 = g.props) == null ? void 0 : _d3.language) || n,
            disabled: ((_e4 = g.props) == null ? void 0 : _e4.disabled) || s,
            showToolbarName: ((_f2 = g.props) == null ? void 0 : _f2.showToolbarName) || d,
            insert(b) {
              E.emit(t, q, "universal", {
                generate: b
              });
            }
          });
        }
        return null;
      }, [
        l,
        p,
        s,
        t,
        n,
        i,
        r,
        o,
        u.fullscreen,
        d,
        e
      ])
    };
  }, _a = () => {
    const t = Pa(), { barRender: e } = _r();
    return f.jsx(D.Provider, {
      value: t,
      children: f.jsx("div", {
        className: `${m}-floating-toolbar`,
        children: t.floatingToolbars.map((o, n) => e(o, `floating-${n}`))
      })
    });
  }, Pr = a.createContext({
    getValue: () => Er,
    subscribe: () => () => {
    }
  }), Pa = () => {
    const t = a.useContext(Pr);
    return a.useSyncExternalStore(t.subscribe, t.getValue);
  }, wt = Ue.define(), Da = Tr.define({
    create() {
      return null;
    },
    update(t, e) {
      for (const o of e.effects) o.is(wt) && (t = o.value);
      return t;
    },
    provide: (t) => ho.from(t)
  }), qa = (t) => {
    let e = null;
    const o = (r, i) => {
      e && e.kind === i.kind && e.pos === i.pos || (e = i, r.dispatch({
        effects: wt.of({
          pos: i.pos,
          above: true,
          arrow: true,
          create: () => {
            const l = document.createElement("div"), d = `${m}-floating-toolbar-container`;
            l.classList.add(d), l.dataset.state = "hidden", requestAnimationFrame(() => {
              l.dataset.state = "visible";
            });
            const u = document.createElement("div");
            l.appendChild(u);
            const p = Gr.createRoot(u);
            return p.render(f.jsx(Pr.Provider, {
              value: t.contextValue,
              children: f.jsx(_a, {})
            })), {
              dom: l,
              destroy: () => p.unmount()
            };
          }
        })
      }));
    }, n = (r) => {
      e && (e = null, r.dispatch({
        effects: wt.of(null)
      }));
    }, s = ce.updateListener.of((r) => {
      if (r.selectionSet || r.docChanged) {
        const i = r.state, l = i.selection.main;
        if (!l.empty) o(r.view, {
          kind: "selection",
          pos: l.anchor
        });
        else {
          const d = l.head, u = i.doc.lineAt(d);
          /^\s*$/.test(u.text) ? o(r.view, {
            kind: "emptyLine",
            pos: d
          }) : n(r.view);
        }
      }
    });
    return [
      Da,
      s
    ];
  }, Wa = /[a-z][a-z0-9.+-]*:\/\/[^\s<>"'`()]+(?:\([^\s<>"'`]*\)[^\s<>"'`]*)*/i, Ba = /\/\/[^\s<>"'`()]+/i, Va = /data:[a-z]+\/[a-z0-9.+-]+(?:;base64)?,[a-z0-9+/=%]+/i, Ua = /\/(?!\/)[^\s<>"'`()]+/i, Qe = new RegExp(`(${Wa.source}|${Ba.source}|${Va.source}|${Ua.source})`, "gi"), Ga = /[a-z0-9.+-]/i, Ka = (t) => {
    const e = [];
    Qe.lastIndex = 0;
    let o;
    for (; o = Qe.exec(t); ) {
      const n = o.index ?? 0, s = n > 0 ? t[n - 1] : "";
      if (s && Ga.test(s) || s === "<" && t[n] === "/") continue;
      const r = n + o[0].length;
      e.push([
        n,
        r
      ]);
    }
    return e;
  }, Za = (t, e, o) => t.some((n) => n.from === e && n.to === o), Xa = (t) => {
    const e = t.shortenText || (() => "..."), o = Ue.define(), n = Ue.define(), s = (d, u) => {
      var _a5;
      const p = new fo(), c = [];
      for (let h = 1; h <= d.doc.lines; h++) {
        const g = d.doc.line(h), b = g.text;
        Qe.lastIndex = 0;
        const x = ((_a5 = t.findTexts) == null ? void 0 : _a5.call(t, {
          state: d,
          lineText: b,
          lineNumber: g.number,
          lineFrom: g.from,
          lineTo: g.to,
          defaultTextRegex: Qe
        })) ?? Ka(b);
        for (const v of x) {
          if (!v) continue;
          const [w, y] = v;
          if (typeof w != "number" || typeof y != "number" || w < 0 || y <= w || w >= b.length || y > b.length) continue;
          const T = b.slice(w, y);
          if (!T || T.length <= t.maxLength) continue;
          const k = g.from + w, C = g.from + y;
          if (Za(u, k, C)) {
            c.push({
              from: k,
              to: C
            });
            continue;
          }
          const I = e(T);
          p.add(k, C, po.replace({
            widget: new r(I, T, k, C)
          }));
        }
      }
      return {
        deco: p.finish(),
        expanded: c
      };
    };
    class r extends go {
      constructor(u, p, c, h) {
        super(), this.short = u, this.raw = p, this.from = c, this.to = h;
      }
      toDOM(u) {
        const p = document.createElement("span");
        return p.textContent = this.short, p.className = "cm-short-text", p.title = this.raw, p.style.display = "inline", p.style.textDecoration = "underline", p.addEventListener("mousedown", (c) => {
          c.preventDefault(), c.stopPropagation(), u.dispatch({
            selection: ke.cursor(this.from),
            effects: o.of({
              from: this.from,
              to: this.to,
              expand: true
            })
          }), u.focus();
        }), p.addEventListener("click", (c) => {
          c.preventDefault();
        }), p;
      }
      ignoreEvent() {
        return false;
      }
      eq(u) {
        return this.short === u.short && this.raw === u.raw && this.from === u.from && this.to === u.to;
      }
    }
    const i = Tr.define({
      create(d) {
        return s(d, []);
      },
      update(d, u) {
        let p = d.expanded;
        u.docChanged && p.length && (p = p.map(({ from: h, to: g }) => ({
          from: u.changes.mapPos(h, 1),
          to: u.changes.mapPos(g, -1)
        })).filter(({ from: h, to: g }) => h < g));
        let c = p !== d.expanded;
        for (const h of u.effects) h.is(o) ? h.value.expand ? p = [
          {
            from: h.value.from,
            to: h.value.to
          }
        ] : p = p.filter(({ from: g, to: b }) => g !== h.value.from || b !== h.value.to) : h.is(n) && p.length > 0 && (p = []);
        return !c && p !== d.expanded && (c = true), u.docChanged || c ? s(u.state, p) : d;
      },
      provide: (d) => ce.decorations.compute([
        d
      ], (u) => u.field(d).deco)
    }), l = ce.domEventHandlers({
      mousedown(d, u) {
        const p = u.state.field(i, false);
        if (!p || p.expanded.length === 0) return false;
        const c = d.target;
        if (c && u.dom.contains(c)) {
          const h = u.posAtDOM(c, 0);
          if (h != null && h !== -1 && p.expanded.some(({ from: g, to: b }) => h >= g && h <= b)) return false;
        }
        return u.dispatch({
          effects: n.of(void 0)
        }), false;
      }
    });
    return [
      i,
      l
    ];
  }, Ya = "#e5c07b", Qt = "var(--md-color)", Qa = "#56b6c2", Ja = "#fff", Ne = "#3f4a54", Jt = "#2d8cf0", el = "#2d8cf0", tl = "#3f4a54", er = "#d19a66", rl = "#c678dd", ol = "#f6f6f6", nl = "#ceedfa33", tr = "var(--md-bk-color)", rt = "var(--md-bk-color)", sl = "#bad5fa", rr = "#3f4a54", il = ce.theme({
    "&": {
      color: Ne,
      backgroundColor: tr
    },
    ".cm-content": {
      caretColor: rr
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: rr
    },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: sl
    },
    ".cm-panels": {
      backgroundColor: ol,
      color: Ne
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "1px solid var(--md-border-color)"
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "1px solid var(--md-border-color)"
    },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": {
      backgroundColor: "#ceedfa33"
    },
    ".cm-selectionMatch": {
      backgroundColor: "#aafe661a"
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: tr,
      color: Ne,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: nl
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: rt
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "var(--md-border-color)",
      borderBottomColor: "var(--md-border-color)"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: rt,
      borderBottomColor: rt
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: Ne
      }
    }
  }), al = Cr.define([
    {
      tag: z.keyword,
      color: rl
    },
    {
      tag: [
        z.name,
        z.deleted,
        z.character,
        z.propertyName,
        z.macroName
      ],
      color: Qt
    },
    {
      tag: [
        z.function(z.variableName),
        z.labelName
      ],
      color: el
    },
    {
      tag: [
        z.color,
        z.constant(z.name),
        z.standard(z.name)
      ],
      color: er
    },
    {
      tag: [
        z.definition(z.name),
        z.separator
      ],
      color: Ne
    },
    {
      tag: [
        z.typeName,
        z.className,
        z.number,
        z.changed,
        z.annotation,
        z.modifier,
        z.self,
        z.namespace
      ],
      color: Ya
    },
    {
      tag: [
        z.operator,
        z.operatorKeyword,
        z.url,
        z.escape,
        z.regexp,
        z.link,
        z.special(z.string)
      ],
      color: Qa
    },
    {
      tag: [
        z.meta,
        z.comment
      ],
      color: Jt
    },
    {
      tag: z.strong,
      fontWeight: "bold"
    },
    {
      tag: z.emphasis,
      fontStyle: "italic"
    },
    {
      tag: z.strikethrough,
      textDecoration: "line-through"
    },
    {
      tag: z.link,
      color: Jt,
      textDecoration: "underline"
    },
    {
      tag: z.heading,
      fontWeight: "bold",
      color: Qt
    },
    {
      tag: [
        z.atom,
        z.bool,
        z.special(z.variableName)
      ],
      color: er
    },
    {
      tag: [
        z.processingInstruction,
        z.string,
        z.inserted
      ],
      color: tl
    },
    {
      tag: z.invalid,
      color: Ja
    }
  ]), or = [
    il,
    $r(al)
  ], ll = "#e5c07b", nr = "var(--md-color)", cl = "#56b6c2", dl = "#ffffff", Ae = "var(--md-color)", sr = "#e5c07b", ul = "#e5c07b", ml = "var(--md-color)", ir = "#d19a66", hl = "#c678dd", fl = "#21252b", pl = "#2c313a", ar = "var(--md-bk-color)", ot = "var(--md-bk-color)", gl = "#ceedfa33", lr = "#528bff", bl = ce.theme({
    "&": {
      color: Ae,
      backgroundColor: ar
    },
    ".cm-content": {
      caretColor: lr
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: lr
    },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: gl
    },
    ".cm-panels": {
      backgroundColor: fl,
      color: Ae
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "1px solid var(--md-border-color)"
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "1px solid var(--md-border-color)"
    },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": {
      backgroundColor: "#ceedfa33"
    },
    ".cm-selectionMatch": {
      backgroundColor: "#aafe661a"
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: ar,
      color: Ae,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: pl
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: ot
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "var(--md-border-color)",
      borderBottomColor: "var(--md-border-color)"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: ot,
      borderBottomColor: ot
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: Ae
      }
    }
  }, {
    dark: true
  }), vl = Cr.define([
    {
      tag: z.keyword,
      color: hl
    },
    {
      tag: [
        z.name,
        z.deleted,
        z.character,
        z.propertyName,
        z.macroName
      ],
      color: nr
    },
    {
      tag: [
        z.function(z.variableName),
        z.labelName
      ],
      color: ul
    },
    {
      tag: [
        z.color,
        z.constant(z.name),
        z.standard(z.name)
      ],
      color: ir
    },
    {
      tag: [
        z.definition(z.name),
        z.separator
      ],
      color: Ae
    },
    {
      tag: [
        z.typeName,
        z.className,
        z.number,
        z.changed,
        z.annotation,
        z.modifier,
        z.self,
        z.namespace
      ],
      color: ll
    },
    {
      tag: [
        z.operator,
        z.operatorKeyword,
        z.url,
        z.escape,
        z.regexp,
        z.link,
        z.special(z.string)
      ],
      color: cl
    },
    {
      tag: [
        z.meta,
        z.comment
      ],
      color: sr
    },
    {
      tag: z.strong,
      fontWeight: "bold"
    },
    {
      tag: z.emphasis,
      fontStyle: "italic"
    },
    {
      tag: z.strikethrough,
      textDecoration: "line-through"
    },
    {
      tag: z.link,
      color: sr,
      textDecoration: "underline"
    },
    {
      tag: z.heading,
      fontWeight: "bold",
      color: nr
    },
    {
      tag: [
        z.atom,
        z.bool,
        z.special(z.variableName)
      ],
      color: ir
    },
    {
      tag: [
        z.processingInstruction,
        z.string,
        z.inserted
      ],
      color: ml
    },
    {
      tag: z.invalid,
      color: dl
    }
  ]), cr = [
    bl,
    $r(vl)
  ], xl = (t, e) => {
    if (t === e) return true;
    if (t.length !== e.length) return false;
    for (let o = 0; o < t.length; o++) if (t[o] !== e[o]) return false;
    return true;
  }, yl = (t, e) => {
    const o = a.useRef([]);
    (!o.current || !xl(o.current, e)) && (o.current = e, t());
  };
  ce.EDIT_CONTEXT = false;
  let Dr, wl, kl, $l, Tl, Cl, El, Sl, jl, Ll, Il, Nl, Al, Ml, zl, Hl, Ol, Rl, Fl, _l, Pl, Dl, ql, Bl, Vl, Ul, Gl, Kl, Zl, Xl;
  Dr = (t) => t.extension instanceof Function ? t.extension(t.options) : t.extension;
  wl = (t) => {
    const e = Dr(t);
    return t.compartment ? t.compartment.of(e) : e;
  };
  kl = (t) => {
    const e = a.useContext(D), { tabWidth: o, editorId: n, theme: s, noPrettier: r, disabled: i, floatingToolbars: l } = e, d = a.useRef(null), u = a.useRef(null), p = a.useRef(true), [c] = a.useState(() => ({
      theme: new ye(),
      autocompletion: new ye(),
      update: new ye(),
      domEvent: new ye(),
      history: new ye(),
      floatingToolbar: new ye()
    })), [h] = a.useState(() => Ti(n, {
      noPrettier: r
    })), g = a.useCallback(() => [
      ...h,
      ...Qr,
      ...Jr,
      eo
    ], [
      h
    ]), b = $i(t, u), [x, v] = a.useState({}), w = a.useMemo(() => {
      const S = {
        paste: b,
        blur: t.onBlur,
        focus: t.onFocus,
        drop: t.onDrop,
        input: (A) => {
          t.onInput && t.onInput(A);
          const { data: H } = A;
          t.maxLength && t.modelValue.length + H.length > t.maxLength && E.emit(n, he, {
            name: "overlength",
            message: "The input text is too long",
            data: H
          });
        }
      }, O = {
        ...S
      }, R = Object.keys(S);
      for (const A in x) {
        const H = A;
        R.includes(H) ? O[H] = (F, P) => {
          x[H](F, P), F.defaultPrevented || S[H](F, P);
        } : O[H] = x[H];
      }
      return O;
    }, [
      x,
      n,
      b,
      t
    ]), y = a.useRef(/* @__PURE__ */ new Set()), T = a.useRef(e);
    a.useEffect(() => {
      T.current = e, y.current.forEach((S) => S());
    }, [
      e
    ]);
    const [k] = a.useState(() => qa({
      contextValue: {
        getValue: () => T.current,
        subscribe: (S) => (y.current.add(S), () => y.current.delete(S))
      }
    })), [C] = a.useState(() => [
      {
        type: "theme",
        extension: ({ theme: S }) => S === "light" ? or : cr,
        compartment: c.theme,
        options: {
          theme: s
        }
      },
      {
        type: "updateListener",
        extension: ce.updateListener.of((S) => {
          S.docChanged && t.onChange(S.state.doc.toString());
        }),
        compartment: c.update
      },
      {
        type: "domEventHandlers",
        extension: ce.domEventHandlers(w),
        compartment: c.domEvent
      },
      {
        type: "completions",
        extension: Yt(t.completions),
        compartment: c.autocompletion
      },
      {
        type: "history",
        extension: It(),
        compartment: c.history
      }
    ]), [I] = a.useState(() => Q.codeMirrorExtensions([
      {
        type: "lineWrapping",
        extension: ce.lineWrapping
      },
      {
        type: "keymap",
        extension: to.of(g())
      },
      {
        type: "drawSelection",
        extension: ro()
      },
      {
        type: "markdown",
        extension: oo({
          codeLanguages: ao
        })
      },
      {
        type: "linkShortener",
        extension: (S) => Xa(S),
        options: {
          maxLength: 30
        }
      },
      {
        type: "floatingToolbar",
        extension: l.length > 0 ? k : [],
        compartment: c.floatingToolbar
      }
    ], {
      editorId: n,
      theme: s,
      keyBindings: g()
    })), [N] = a.useState(() => [
      ...I,
      ...C
    ].map(wl)), $ = a.useCallback(() => {
      var _a5, _b3;
      (_a5 = u.current) == null ? void 0 : _a5.view.dispatch({
        effects: c.history.reconfigure([])
      }), (_b3 = u.current) == null ? void 0 : _b3.view.dispatch({
        effects: c.history.reconfigure(It())
      });
    }, [
      c.history
    ]);
    return a.useEffect(() => {
      const S = new ce({
        doc: t.modelValue,
        parent: d.current,
        extensions: N
      }), O = new ki(S);
      u.current = O, setTimeout(() => {
        O.setTabSize(o), O.setDisabled(!!i), O.setReadOnly(t.readOnly), t.placeholder && O.setPlaceholder(t.placeholder), typeof t.maxLength == "number" && O.setMaxLength(t.maxLength), t.autoFocus && S.focus(), p.current = false;
      }, 0);
      const R = () => uo(S), A = () => mo(S), H = (j) => {
        v(j);
      }, F = (j, M) => {
        const L = S.state.doc.line(j);
        S.dispatch(S.state.update({
          changes: {
            from: L.from,
            to: L.to,
            insert: M
          }
        }));
      }, P = () => {
        E.emit(n, Xe, S);
      };
      return E.on(n, {
        name: ht,
        callback: R
      }), E.on(n, {
        name: ft,
        callback: A
      }), E.on(n, {
        name: gt,
        callback: H
      }), E.on(n, {
        name: bt,
        callback: F
      }), E.on(n, {
        name: vt,
        callback: P
      }), E.emit(n, Xe, S), () => {
        S.destroy(), E.remove(n, ht, R), E.remove(n, ft, A), E.remove(n, gt, H), E.remove(n, bt, F), E.remove(n, vt, P), p.current = true;
      };
    }, []), a.useEffect(() => {
      const S = async (O, R = {}) => {
        var _a5, _b3;
        if (O === "image" && R.transform) {
          const A = t.transformImgUrl(R.url);
          if (A instanceof Promise) A.then(async (H) => {
            var _a6;
            const { text: F, options: P } = await tt(O, u.current, {
              ...R,
              url: H
            });
            (_a6 = u.current) == null ? void 0 : _a6.replaceSelectedText(F, P, n);
          }).catch((H) => {
            console.error(H);
          });
          else {
            const { text: H, options: F } = await tt(O, u.current, {
              ...R,
              url: A
            });
            (_a5 = u.current) == null ? void 0 : _a5.replaceSelectedText(H, F, n);
          }
        } else {
          const { text: A, options: H } = await tt(O, u.current, R);
          (_b3 = u.current) == null ? void 0 : _b3.replaceSelectedText(A, H, n);
        }
      };
      return E.on(n, {
        name: q,
        callback: S
      }), () => {
        E.remove(n, q, S);
      };
    }, [
      n,
      t
    ]), a.useEffect(() => {
      setTimeout(() => {
        var _a5;
        (_a5 = u.current) == null ? void 0 : _a5.view.dispatch({
          effects: c.theme.reconfigure(s === "light" ? or : cr)
        });
      }, 0);
    }, [
      c.theme,
      s
    ]), a.useEffect(() => {
      setTimeout(() => {
        var _a5;
        (_a5 = u.current) == null ? void 0 : _a5.view.dispatch({
          effects: [
            c.update.reconfigure(ce.updateListener.of((S) => {
              S.docChanged && t.onChange(S.state.doc.toString());
            })),
            c.domEvent.reconfigure(ce.domEventHandlers(w)),
            c.autocompletion.reconfigure(Yt(t.completions))
          ]
        });
      }, 0);
    }, [
      c.autocompletion,
      c.domEvent,
      c.update,
      w,
      t
    ]), a.useEffect(() => {
      var _a5, _b3;
      ((_a5 = u.current) == null ? void 0 : _a5.getValue()) !== t.modelValue && ((_b3 = u.current) == null ? void 0 : _b3.setValue(t.modelValue));
    }, [
      t.modelValue
    ]), a.useEffect(() => {
      var _a5;
      p.current || ((_a5 = u.current) == null ? void 0 : _a5.setTabSize(o));
    }, [
      o
    ]), a.useEffect(() => {
      var _a5;
      p.current || ((_a5 = u.current) == null ? void 0 : _a5.setPlaceholder(t.placeholder));
    }, [
      t.placeholder
    ]), a.useEffect(() => {
      var _a5;
      p.current || ((_a5 = u.current) == null ? void 0 : _a5.setDisabled(!!i));
    }, [
      i
    ]), a.useEffect(() => {
      var _a5;
      p.current || ((_a5 = u.current) == null ? void 0 : _a5.setDisabled(t.readOnly));
    }, [
      t.readOnly
    ]), a.useEffect(() => {
      var _a5;
      p.current || typeof t.maxLength == "number" && ((_a5 = u.current) == null ? void 0 : _a5.setMaxLength(t.maxLength));
    }, [
      t.maxLength
    ]), yl(() => {
      var _a5, _b3;
      const S = I.find((O) => O.type === "floatingToolbar");
      (S == null ? void 0 : S.compartment) && (l.length > 0 ? (_a5 = u.current) == null ? void 0 : _a5.view.dispatch({
        effects: S.compartment.reconfigure(Dr(S))
      }) : (_b3 = u.current) == null ? void 0 : _b3.view.dispatch({
        effects: S.compartment.reconfigure([])
      }));
    }, l), {
      inputWrapperRef: d,
      codeMirrorUt: u,
      resetHistory: $
    };
  };
  $l = (t, e, o) => {
    const { setting: n } = a.useContext(D), { inputBoxWidth: s, onInputBoxWidthChange: r } = t, i = a.useMemo(() => /px$/.test(`${s}`) ? "50%" : s, [
      s
    ]), [l, d] = a.useState({
      width: i
    }), [u, p] = a.useState({
      insetInlineStart: i
    }), c = a.useRef(i);
    return a.useEffect(() => {
      const h = (x) => {
        var _a5, _b3;
        const v = ((_a5 = e.current) == null ? void 0 : _a5.offsetWidth) || 0, w = ((_b3 = e.current) == null ? void 0 : _b3.getBoundingClientRect().x) || 0;
        let y = x.x - w;
        y / v < _e ? y = v * _e : y > v - v * _e && (y = v - v * _e);
        const T = `${y / v * 100}%`;
        d((k) => ({
          ...k,
          width: T
        })), p((k) => ({
          ...k,
          insetInlineStart: T
        })), c.current = T, r == null ? void 0 : r(T);
      }, g = (x) => {
        x.target === o.current && (p((v) => ({
          ...v
        })), document.addEventListener("mousemove", h));
      }, b = () => {
        p((x) => ({
          ...x
        })), document.removeEventListener("mousemove", h);
      };
      return document.addEventListener("mousedown", g), document.addEventListener("mouseup", b), () => {
        document.removeEventListener("mousedown", g), document.removeEventListener("mouseup", b), document.removeEventListener("mousemove", h);
      };
    }, [
      e,
      r,
      o
    ]), a.useEffect(() => {
      c.current = i, d((h) => ({
        ...h,
        width: i
      })), p((h) => ({
        ...h,
        insetInlineStart: i
      }));
    }, [
      i
    ]), a.useEffect(() => {
      const h = n.previewOnly;
      let g = "", b = "";
      h ? (g = "0%", b = "none") : !n.htmlPreview && !n.preview ? (g = "100%", b = "none") : (g = c.current, b = "initial"), d((x) => ({
        ...x,
        width: g
      })), p((x) => ({
        ...x,
        display: b
      }));
    }, [
      n.htmlPreview,
      n.preview,
      n.previewOnly
    ]), {
      inputWrapperStyle: l,
      resizeOperateStyle: u
    };
  };
  Tl = $t();
  Cl = () => {
    const { editorId: t } = a.useContext(D), e = a.useRef(true), o = a.useCallback((r, i) => {
      const l = document.querySelector(`#${t} .${m}-catalog-editor`);
      if (!i || !e.current || !l) return;
      const d = i.offsetTop - l.scrollTop;
      (d > 100 || d < 100) && Tl(l, i.offsetTop - 100);
    }, [
      t
    ]), n = a.useCallback(() => e.current = false, []), s = a.useCallback(() => e.current = true, []);
    return {
      onCatalogActive: o,
      onMouseEnter: n,
      onMouseLeave: s
    };
  };
  El = $t();
  Sl = {
    flex: 1
  };
  jl = a.forwardRef((t, e) => {
    const { onHtmlChanged: o } = t, { editorId: n, theme: s, catalogVisible: r, setting: i } = a.useContext(D), [l, d] = a.useState(""), u = a.useRef(null), p = a.useRef(null), c = a.useCallback(($) => {
      d($), o == null ? void 0 : o($);
    }, [
      o
    ]), { inputWrapperRef: h, codeMirrorUt: g, resetHistory: b } = kl(t), { inputWrapperStyle: x, resizeOperateStyle: v } = $l(t, u, p);
    di(t, l, g);
    const { onCatalogActive: w, onMouseEnter: y, onMouseLeave: T } = Cl();
    a.useImperativeHandle(e, () => ({
      getSelectedText() {
        var _a5;
        return (_a5 = g.current) == null ? void 0 : _a5.getSelectedText();
      },
      focus($) {
        var _a5;
        (_a5 = g.current) == null ? void 0 : _a5.focus($);
      },
      resetHistory: b,
      getEditorView() {
        var _a5;
        return (_a5 = g.current) == null ? void 0 : _a5.view;
      }
    }), [
      g,
      b
    ]);
    const k = a.useCallback(($, S) => {
      var _a5, _b3;
      if (!i.preview && S.line !== void 0) {
        $.preventDefault();
        const O = (_a5 = g.current) == null ? void 0 : _a5.view;
        if (O) {
          const R = O.state.doc.line(S.line + 1), A = (_b3 = O.lineBlockAt(R.from)) == null ? void 0 : _b3.top, H = O.scrollDOM;
          El(H, A);
        }
      }
    }, [
      g,
      i.preview
    ]), C = a.useMemo(() => f.jsx("div", {
      className: `${m}-input-wrapper`,
      ref: h
    }), [
      h
    ]), I = a.useMemo(() => f.jsx(Hr, {
      modelValue: t.modelValue,
      onChange: t.onChange,
      setting: i,
      onHtmlChanged: c,
      onGetCatalog: t.onGetCatalog,
      mdHeadingId: t.mdHeadingId,
      noMermaid: t.noMermaid,
      sanitize: t.sanitize,
      noKatex: t.noKatex,
      formatCopiedText: t.formatCopiedText,
      noHighlight: t.noHighlight,
      noImgZoomIn: t.noImgZoomIn,
      sanitizeMermaid: t.sanitizeMermaid,
      codeFoldable: t.codeFoldable,
      autoFoldThreshold: t.autoFoldThreshold,
      onRemount: t.onRemount,
      previewComponent: t.previewComponent,
      noEcharts: t.noEcharts
    }), [
      c,
      t.autoFoldThreshold,
      t.codeFoldable,
      t.formatCopiedText,
      t.mdHeadingId,
      t.modelValue,
      t.noEcharts,
      t.noHighlight,
      t.noImgZoomIn,
      t.noKatex,
      t.noMermaid,
      t.onChange,
      t.onGetCatalog,
      t.onRemount,
      t.previewComponent,
      t.sanitize,
      t.sanitizeMermaid,
      i
    ]), N = a.useMemo(() => f.jsx(Lr, {
      theme: s,
      className: `${m}-catalog-editor`,
      editorId: n,
      mdHeadingId: t.mdHeadingId,
      scrollElementOffsetTop: 2,
      syncWith: i.preview ? "preview" : "editor",
      onClick: k,
      catalogMaxDepth: t.catalogMaxDepth,
      onActive: w
    }, "internal-catalog"), [
      n,
      w,
      k,
      t.catalogMaxDepth,
      t.mdHeadingId,
      i.preview,
      s
    ]);
    return f.jsxs("div", {
      className: `${m}-content`,
      children: [
        f.jsxs("div", {
          className: `${m}-content-wrapper`,
          ref: u,
          children: [
            f.jsx(et, {
              alwaysShowTrack: true,
              scrollTarget: `#${n} .cm-scroller`,
              style: x,
              children: C
            }),
            (i.htmlPreview || i.preview) && f.jsx("div", {
              className: `${m}-resize-operate`,
              style: v,
              ref: p
            }),
            f.jsx(et, {
              style: Sl,
              children: I
            })
          ]
        }),
        r && f.jsx(et, {
          className: `${m}-catalog-${t.catalogLayout}`,
          onMouseEnter: y,
          onMouseLeave: T,
          children: N
        })
      ]
    });
  });
  Ll = a.memo(jl);
  Il = ({ modelValue: t }) => {
    const { usedLanguageText: e } = a.useContext(D);
    return a.useMemo(() => {
      var _a5;
      return f.jsxs("div", {
        className: `${m}-footer-item`,
        children: [
          f.jsx("label", {
            className: `${m}-footer-label`,
            children: `${(_a5 = e.footer) == null ? void 0 : _a5.markdownTotal}:`
          }),
          f.jsx("span", {
            children: t.length || 0
          })
        ]
      });
    }, [
      e,
      t
    ]);
  };
  Nl = (t) => {
    const e = a.useCallback(() => {
      t.disabled || t.onChange(!t.checked);
    }, [
      t
    ]);
    return f.jsx("div", {
      className: B([
        `${m}-checkbox`,
        t.checked && `${m}-checkbox-checked`,
        t.disabled && `${m}-disabled`
      ]),
      onClick: e
    });
  };
  Al = (t) => {
    var _a5;
    const { usedLanguageText: e, disabled: o } = a.useContext(D);
    return f.jsxs("div", {
      className: B([
        `${m}-footer-item`,
        o && `${m}-disabled`
      ]),
      children: [
        f.jsx("label", {
          className: `${m}-footer-label`,
          onClick: () => {
            o || t.onScrollAutoChange(!t.scrollAuto);
          },
          children: (_a5 = e.footer) == null ? void 0 : _a5.scrollAuto
        }),
        f.jsx(Nl, {
          disabled: o,
          checked: t.scrollAuto,
          onChange: t.onScrollAutoChange
        })
      ]
    });
  };
  Ml = a.memo(Al);
  zl = (t) => {
    const { theme: e, language: o, disabled: n } = a.useContext(D), s = a.useCallback((l) => {
      var _a5, _b3, _c3;
      if (Et.includes(l)) switch (l) {
        case "markdownTotal":
          return f.jsx(Il, {
            modelValue: t.modelValue
          }, "markdown-total");
        case "scrollSwitch":
          return !t.noScrollAuto && f.jsx(Ml, {
            scrollAuto: t.scrollAuto,
            onScrollAutoChange: t.onScrollAutoChange
          }, "scroll-auto");
      }
      else {
        const d = t.defFooters[l];
        return typeof d != "string" ? a.cloneElement(d, {
          theme: ((_a5 = d.props) == null ? void 0 : _a5.theme) || e,
          language: ((_b3 = d.props) == null ? void 0 : _b3.language) || o,
          disabled: ((_c3 = d.props) == null ? void 0 : _c3.disabled) || n
        }) : d || "";
      }
    }, [
      t.modelValue,
      t.noScrollAuto,
      t.scrollAuto,
      t.onScrollAutoChange,
      t.defFooters,
      e,
      o,
      n
    ]), [r, i] = a.useMemo(() => {
      const l = t.footers.indexOf("="), d = l === -1 ? t.footers : t.footers.slice(0, l), u = l === -1 ? [] : t.footers.slice(l, Number.MAX_SAFE_INTEGER);
      return [
        d.map((p) => s(p)),
        u.map((p) => s(p))
      ];
    }, [
      t.footers,
      s
    ]);
    return f.jsxs("div", {
      className: `${m}-footer`,
      children: [
        f.jsx("div", {
          className: `${m}-footer-left`,
          children: r
        }),
        f.jsx("div", {
          className: `${m}-footer-right`,
          children: i
        })
      ]
    });
  };
  Hl = a.memo(zl);
  Ol = (t) => {
    const { toolbars: e, toolbarsExclude: o } = t, { editorId: n, showToolbarName: s } = a.useContext(D), [r] = a.useState(() => `${n}-toolbar-wrapper`), i = a.useRef(null), { barRender: l } = _r(), d = a.useMemo(() => {
      const u = e.filter((g) => !o.includes(g)), p = u.indexOf("="), c = p === -1 ? u : u.slice(0, p + 1), h = p === -1 ? [] : u.slice(p, Number.MAX_SAFE_INTEGER);
      return [
        c.map((g, b) => l(g, `left-${b}`)),
        h.map((g, b) => l(g, `right-${b}`))
      ];
    }, [
      e,
      o,
      l
    ]);
    return a.useEffect(() => {
      let u = () => {
      };
      return i.current && (u = xo(i.current)), () => {
        u();
      };
    }, [
      e
    ]), f.jsx(f.Fragment, {
      children: e.length > 0 && f.jsx("div", {
        className: `${m}-toolbar-wrapper`,
        ref: i,
        id: r,
        children: f.jsxs("div", {
          className: B([
            `${m}-toolbar`,
            s && `${m}-stn`
          ]),
          children: [
            f.jsx("div", {
              className: `${m}-toolbar-left`,
              children: d[0]
            }),
            f.jsx("div", {
              className: `${m}-toolbar-right`,
              children: d[1]
            })
          ]
        })
      })
    });
  };
  Rl = a.memo(Ol);
  Fl = a.forwardRef((t, e) => {
    const { value: o = t.modelValue || _.modelValue, theme: n = _.theme, codeTheme: s = _.codeTheme, className: r = _.className, toolbars: i = _.toolbars, toolbarsExclude: l = _.toolbarsExclude, defToolbars: d = _.defToolbars, tabWidth: u = _.tabWidth, showCodeRowNumber: p = _.showCodeRowNumber, previewTheme: c = _.previewTheme, noPrettier: h = _.noPrettier, tableShape: g = _.tableShape, noMermaid: b = _.noMermaid, noKatex: x = _.noKatex, placeholder: v = _.placeholder, onChange: w = _.onChange, onHtmlChanged: y = _.onHtmlChanged, onGetCatalog: T = _.onGetCatalog, sanitize: k = _.sanitize, onError: C = _.onError, mdHeadingId: I = _.mdHeadingId, footers: N = _.footers, defFooters: $ = _.defFooters, noUploadImg: S = _.noUploadImg, noHighlight: O = _.noHighlight, noImgZoomIn: R = _.noImgZoomIn, language: A = _.language, inputBoxWidth: H = _.inputBoxWidth, sanitizeMermaid: F = _.sanitizeMermaid, transformImgUrl: P = _.transformImgUrl, codeFoldable: j = _.codeFoldable, autoFoldThreshold: M = _.autoFoldThreshold, catalogLayout: L = _.catalogLayout, floatingToolbars: W = _.floatingToolbars, customIcon: V = _.customIcon, previewComponent: X, disabled: J, showToolbarName: re } = t, oe = Rr(t), [Z] = a.useState(() => ({
      editorId: oe,
      noKatex: x,
      noMermaid: b,
      noPrettier: h,
      noUploadImg: S,
      noHighlight: O
    })), [pe, ge] = a.useState(() => ({
      scrollAuto: t.scrollAuto === void 0 ? true : t.scrollAuto
    })), de = a.useRef(null), K = a.useRef(void 0), te = a.useCallback(($e) => {
      ge((Fe) => ({
        ...Fe,
        scrollAuto: $e
      }));
    }, [
      ge
    ]);
    Hn(t, Z), On(Z), Fn(t, Z), Rn(Z.editorId, C);
    const ie = _n(t, Z), [ne, fe, ae, le] = Pn(t);
    Dn(e, Z, ie, ae, le, K);
    const je = a.useMemo(() => ({
      editorId: Z.editorId,
      tabWidth: u,
      theme: n,
      language: A,
      highlight: ne,
      showCodeRowNumber: p,
      usedLanguageText: fe,
      previewTheme: c,
      customIcon: V,
      rootRef: de,
      disabled: J,
      showToolbarName: re,
      setting: ae,
      updateSetting: le,
      tableShape: g,
      catalogVisible: ie,
      noUploadImg: S,
      noPrettier: h,
      codeTheme: s,
      defToolbars: d,
      floatingToolbars: W
    }), [
      ie,
      s,
      V,
      d,
      J,
      W,
      ne,
      A,
      h,
      S,
      c,
      ae,
      p,
      re,
      Z.editorId,
      u,
      g,
      n,
      le,
      fe
    ]);
    return a.useEffect(() => () => {
      E.clear(Z.editorId);
    }, [
      Z.editorId
    ]), f.jsx(D.Provider, {
      value: je,
      children: f.jsxs("div", {
        id: Z.editorId,
        className: B([
          m,
          !!r && r,
          n === "dark" && `${m}-dark`,
          (ae.fullscreen || ae.pageFullscreen) && `${m}-fullscreen`
        ]),
        style: t.style,
        ref: de,
        children: [
          i.length > 0 && f.jsx(Rl, {
            toolbars: i,
            toolbarsExclude: l
          }),
          f.jsx(Ll, {
            ref: K,
            modelValue: o,
            onChange: w,
            setting: ae,
            mdHeadingId: I,
            onHtmlChanged: y,
            onGetCatalog: T,
            sanitize: k,
            noMermaid: Z.noMermaid,
            noHighlight: Z.noHighlight,
            placeholder: v,
            noKatex: Z.noKatex,
            scrollAuto: pe.scrollAuto,
            formatCopiedText: t.formatCopiedText,
            autoFocus: t.autoFocus,
            readOnly: t.readOnly,
            maxLength: t.maxLength,
            autoDetectCode: t.autoDetectCode,
            onBlur: t.onBlur,
            onFocus: t.onFocus,
            onInput: t.onInput,
            completions: t.completions,
            noImgZoomIn: R,
            onDrop: t.onDrop,
            inputBoxWidth: H,
            onInputBoxWidthChange: t.onInputBoxWidthChange,
            sanitizeMermaid: F,
            transformImgUrl: P,
            codeFoldable: j,
            autoFoldThreshold: M,
            onRemount: t.onRemount,
            catalogLayout: L,
            catalogMaxDepth: t.catalogMaxDepth,
            noEcharts: t.noEcharts,
            previewComponent: X
          }),
          N.length > 0 && f.jsx(Hl, {
            modelValue: o,
            footers: N,
            defFooters: $,
            noScrollAuto: !ae.preview && !ae.htmlPreview || ae.previewOnly,
            scrollAuto: pe.scrollAuto,
            onScrollAutoChange: te
          })
        ]
      })
    });
  });
  _l = a.memo(Fl);
  Pl = (t) => {
    const e = a.useMemo(() => `${m}-toolbar-item${t.disabled ? " " + m + "-disabled" : ""}`, [
      t.disabled
    ]);
    return f.jsx("button", {
      className: e,
      title: t.title || "",
      "aria-label": t.title || "",
      onClick: (o) => {
        t.disabled || t.onClick(o);
      },
      type: "button",
      children: t.children || t.trigger
    });
  };
  Dl = a.memo(Pl);
  ql = (t) => {
    const { editorId: e } = a.useContext(D), o = a.useMemo(() => `${m}-toolbar-item${t.disabled ? " " + m + "-disabled" : ""}`, [
      t.disabled
    ]);
    return f.jsx(Se, {
      relative: `#${e}-toolbar-wrapper`,
      visible: t.visible,
      onChange: t.onChange,
      overlay: t.overlay,
      disabled: t.disabled,
      children: f.jsx("button", {
        className: o,
        title: t.title || "",
        "aria-label": t.title || "",
        disabled: t.disabled,
        type: "button",
        children: t.children || t.trigger
      })
    });
  };
  Wl = a.memo(ql);
  Bl = (t) => {
    const { width: e = "auto", height: o = "auto" } = t, n = a.useCallback((s) => {
      t.onAdjust instanceof Function && t.onAdjust(s);
    }, [
      t
    ]);
    return f.jsxs(f.Fragment, {
      children: [
        f.jsx("button", {
          className: `${m}-toolbar-item${t.disabled ? " " + m + "-disabled" : ""}`,
          title: t.title || "",
          "aria-label": t.title || "",
          onClick: (s) => {
            t.onClick(s);
          },
          disabled: t.disabled,
          type: "button",
          children: t.trigger
        }),
        f.jsx(St, {
          className: t.className,
          style: t.style,
          width: e,
          height: o,
          title: t.modalTitle,
          visible: t.visible,
          showMask: t.showMask,
          onClose: t.onClose,
          showAdjust: t.showAdjust,
          isFullscreen: t.isFullscreen,
          onAdjust: n,
          children: t.children
        })
      ]
    });
  };
  Vl = a.memo(Bl);
  Ul = (t, e) => {
    const { editorId: o } = t;
    a.useImperativeHandle(e, () => ({
      rerender() {
        E.emit(o, Ze);
      }
    }), [
      o
    ]);
  };
  Gl = a.forwardRef((t, e) => {
    const { value: o = t.modelValue || _.modelValue, onChange: n = _.onChange, theme: s = _.theme, className: r = _.className, showCodeRowNumber: i = _.showCodeRowNumber, previewTheme: l = _.previewTheme, noMermaid: d = _.noMermaid, noKatex: u = _.noKatex, onHtmlChanged: p = _.onHtmlChanged, onGetCatalog: c = _.onGetCatalog, sanitize: h = _.sanitize, mdHeadingId: g = _.mdHeadingId, noHighlight: b = _.noHighlight, noImgZoomIn: x = _.noImgZoomIn, language: v = _.language, sanitizeMermaid: w = _.sanitizeMermaid, codeFoldable: y = _.codeFoldable, autoFoldThreshold: T = _.autoFoldThreshold, codeTheme: k = _.codeTheme, previewComponent: C } = t, I = Rr(t), [N] = a.useState(() => ({
      editorId: I,
      noKatex: u,
      noMermaid: d,
      noHighlight: b
    })), $ = a.useRef(null), [S, O] = Or(t);
    Ul(N, e), a.useEffect(() => () => {
      E.clear(I);
    }, [
      I
    ]);
    const R = a.useMemo(() => ({
      editorId: N.editorId,
      tabWidth: 2,
      theme: s,
      language: v,
      highlight: S,
      showCodeRowNumber: i,
      usedLanguageText: O,
      previewTheme: l,
      customIcon: t.customIcon || {},
      rootRef: $,
      disabled: false,
      showToolbarName: false,
      setting: {
        preview: true,
        htmlPreview: false,
        previewOnly: false,
        pageFullscreen: false,
        fullscreen: false
      },
      updateSetting: () => {
      },
      tableShape: [
        6,
        4
      ],
      catalogVisible: false,
      noUploadImg: true,
      noPrettier: true,
      codeTheme: k,
      defToolbars: [],
      floatingToolbars: []
    }), [
      k,
      S,
      v,
      l,
      t.customIcon,
      i,
      N.editorId,
      s,
      O
    ]);
    return f.jsx(D.Provider, {
      value: R,
      children: f.jsx("div", {
        id: N.editorId,
        className: B([
          m,
          r,
          t.theme === "dark" && `${m}-dark`,
          `${m}-previewOnly`
        ]),
        style: t.style,
        ref: $,
        children: f.jsx(Hr, {
          modelValue: o,
          onChange: n,
          mdHeadingId: g,
          onHtmlChanged: p,
          onGetCatalog: c,
          sanitize: h,
          noMermaid: N.noMermaid,
          noHighlight: N.noHighlight,
          noKatex: N.noKatex,
          formatCopiedText: t.formatCopiedText,
          noImgZoomIn: x,
          previewOnly: true,
          sanitizeMermaid: w,
          codeFoldable: y,
          autoFoldThreshold: T,
          onRemount: t.onRemount,
          noEcharts: t.noEcharts,
          previewComponent: C
        }, "preview-only")
      })
    });
  });
  Kl = a.memo(Gl);
  Zl = He["zh-CN"];
  Xl = He["en-US"];
  function Yl(t, e) {
    for (var o = 0; o < e.length; o++) {
      const n = e[o];
      if (typeof n != "string" && !Array.isArray(n)) {
        for (const s in n) if (s !== "default" && !(s in t)) {
          const r = Object.getOwnPropertyDescriptor(n, s);
          r && Object.defineProperty(t, s, r.get ? r : {
            enumerable: true,
            get: () => n[s]
          });
        }
      }
    }
    return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }));
  }
  const Ql = (t) => f.jsx("div", {
    className: B([
      `${m}-footer-item`,
      t.disabled && `${m}-disabled`
    ]),
    onClick: (e) => {
      var _a5;
      t.disabled || ((_a5 = t.onClick) == null ? void 0 : _a5.call(t, e));
    },
    children: t.children
  }), Jl = a.memo(Ql);
  function ec(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
  }
  var nt = {
    exports: {}
  }, ee = {}, st = {
    exports: {}
  }, xe = {}, dr;
  function qr() {
    if (dr) return xe;
    dr = 1;
    function t() {
      var r = {};
      return r["align-content"] = false, r["align-items"] = false, r["align-self"] = false, r["alignment-adjust"] = false, r["alignment-baseline"] = false, r.all = false, r["anchor-point"] = false, r.animation = false, r["animation-delay"] = false, r["animation-direction"] = false, r["animation-duration"] = false, r["animation-fill-mode"] = false, r["animation-iteration-count"] = false, r["animation-name"] = false, r["animation-play-state"] = false, r["animation-timing-function"] = false, r.azimuth = false, r["backface-visibility"] = false, r.background = true, r["background-attachment"] = true, r["background-clip"] = true, r["background-color"] = true, r["background-image"] = true, r["background-origin"] = true, r["background-position"] = true, r["background-repeat"] = true, r["background-size"] = true, r["baseline-shift"] = false, r.binding = false, r.bleed = false, r["bookmark-label"] = false, r["bookmark-level"] = false, r["bookmark-state"] = false, r.border = true, r["border-bottom"] = true, r["border-bottom-color"] = true, r["border-bottom-left-radius"] = true, r["border-bottom-right-radius"] = true, r["border-bottom-style"] = true, r["border-bottom-width"] = true, r["border-collapse"] = true, r["border-color"] = true, r["border-image"] = true, r["border-image-outset"] = true, r["border-image-repeat"] = true, r["border-image-slice"] = true, r["border-image-source"] = true, r["border-image-width"] = true, r["border-left"] = true, r["border-left-color"] = true, r["border-left-style"] = true, r["border-left-width"] = true, r["border-radius"] = true, r["border-right"] = true, r["border-right-color"] = true, r["border-right-style"] = true, r["border-right-width"] = true, r["border-spacing"] = true, r["border-style"] = true, r["border-top"] = true, r["border-top-color"] = true, r["border-top-left-radius"] = true, r["border-top-right-radius"] = true, r["border-top-style"] = true, r["border-top-width"] = true, r["border-width"] = true, r.bottom = false, r["box-decoration-break"] = true, r["box-shadow"] = true, r["box-sizing"] = true, r["box-snap"] = true, r["box-suppress"] = true, r["break-after"] = true, r["break-before"] = true, r["break-inside"] = true, r["caption-side"] = false, r.chains = false, r.clear = true, r.clip = false, r["clip-path"] = false, r["clip-rule"] = false, r.color = true, r["color-interpolation-filters"] = true, r["column-count"] = false, r["column-fill"] = false, r["column-gap"] = false, r["column-rule"] = false, r["column-rule-color"] = false, r["column-rule-style"] = false, r["column-rule-width"] = false, r["column-span"] = false, r["column-width"] = false, r.columns = false, r.contain = false, r.content = false, r["counter-increment"] = false, r["counter-reset"] = false, r["counter-set"] = false, r.crop = false, r.cue = false, r["cue-after"] = false, r["cue-before"] = false, r.cursor = false, r.direction = false, r.display = true, r["display-inside"] = true, r["display-list"] = true, r["display-outside"] = true, r["dominant-baseline"] = false, r.elevation = false, r["empty-cells"] = false, r.filter = false, r.flex = false, r["flex-basis"] = false, r["flex-direction"] = false, r["flex-flow"] = false, r["flex-grow"] = false, r["flex-shrink"] = false, r["flex-wrap"] = false, r.float = false, r["float-offset"] = false, r["flood-color"] = false, r["flood-opacity"] = false, r["flow-from"] = false, r["flow-into"] = false, r.font = true, r["font-family"] = true, r["font-feature-settings"] = true, r["font-kerning"] = true, r["font-language-override"] = true, r["font-size"] = true, r["font-size-adjust"] = true, r["font-stretch"] = true, r["font-style"] = true, r["font-synthesis"] = true, r["font-variant"] = true, r["font-variant-alternates"] = true, r["font-variant-caps"] = true, r["font-variant-east-asian"] = true, r["font-variant-ligatures"] = true, r["font-variant-numeric"] = true, r["font-variant-position"] = true, r["font-weight"] = true, r.grid = false, r["grid-area"] = false, r["grid-auto-columns"] = false, r["grid-auto-flow"] = false, r["grid-auto-rows"] = false, r["grid-column"] = false, r["grid-column-end"] = false, r["grid-column-start"] = false, r["grid-row"] = false, r["grid-row-end"] = false, r["grid-row-start"] = false, r["grid-template"] = false, r["grid-template-areas"] = false, r["grid-template-columns"] = false, r["grid-template-rows"] = false, r["hanging-punctuation"] = false, r.height = true, r.hyphens = false, r.icon = false, r["image-orientation"] = false, r["image-resolution"] = false, r["ime-mode"] = false, r["initial-letters"] = false, r["inline-box-align"] = false, r["justify-content"] = false, r["justify-items"] = false, r["justify-self"] = false, r.left = false, r["letter-spacing"] = true, r["lighting-color"] = true, r["line-box-contain"] = false, r["line-break"] = false, r["line-grid"] = false, r["line-height"] = false, r["line-snap"] = false, r["line-stacking"] = false, r["line-stacking-ruby"] = false, r["line-stacking-shift"] = false, r["line-stacking-strategy"] = false, r["list-style"] = true, r["list-style-image"] = true, r["list-style-position"] = true, r["list-style-type"] = true, r.margin = true, r["margin-bottom"] = true, r["margin-left"] = true, r["margin-right"] = true, r["margin-top"] = true, r["marker-offset"] = false, r["marker-side"] = false, r.marks = false, r.mask = false, r["mask-box"] = false, r["mask-box-outset"] = false, r["mask-box-repeat"] = false, r["mask-box-slice"] = false, r["mask-box-source"] = false, r["mask-box-width"] = false, r["mask-clip"] = false, r["mask-image"] = false, r["mask-origin"] = false, r["mask-position"] = false, r["mask-repeat"] = false, r["mask-size"] = false, r["mask-source-type"] = false, r["mask-type"] = false, r["max-height"] = true, r["max-lines"] = false, r["max-width"] = true, r["min-height"] = true, r["min-width"] = true, r["move-to"] = false, r["nav-down"] = false, r["nav-index"] = false, r["nav-left"] = false, r["nav-right"] = false, r["nav-up"] = false, r["object-fit"] = false, r["object-position"] = false, r.opacity = false, r.order = false, r.orphans = false, r.outline = false, r["outline-color"] = false, r["outline-offset"] = false, r["outline-style"] = false, r["outline-width"] = false, r.overflow = false, r["overflow-wrap"] = false, r["overflow-x"] = false, r["overflow-y"] = false, r.padding = true, r["padding-bottom"] = true, r["padding-left"] = true, r["padding-right"] = true, r["padding-top"] = true, r.page = false, r["page-break-after"] = false, r["page-break-before"] = false, r["page-break-inside"] = false, r["page-policy"] = false, r.pause = false, r["pause-after"] = false, r["pause-before"] = false, r.perspective = false, r["perspective-origin"] = false, r.pitch = false, r["pitch-range"] = false, r["play-during"] = false, r.position = false, r["presentation-level"] = false, r.quotes = false, r["region-fragment"] = false, r.resize = false, r.rest = false, r["rest-after"] = false, r["rest-before"] = false, r.richness = false, r.right = false, r.rotation = false, r["rotation-point"] = false, r["ruby-align"] = false, r["ruby-merge"] = false, r["ruby-position"] = false, r["shape-image-threshold"] = false, r["shape-outside"] = false, r["shape-margin"] = false, r.size = false, r.speak = false, r["speak-as"] = false, r["speak-header"] = false, r["speak-numeral"] = false, r["speak-punctuation"] = false, r["speech-rate"] = false, r.stress = false, r["string-set"] = false, r["tab-size"] = false, r["table-layout"] = false, r["text-align"] = true, r["text-align-last"] = true, r["text-combine-upright"] = true, r["text-decoration"] = true, r["text-decoration-color"] = true, r["text-decoration-line"] = true, r["text-decoration-skip"] = true, r["text-decoration-style"] = true, r["text-emphasis"] = true, r["text-emphasis-color"] = true, r["text-emphasis-position"] = true, r["text-emphasis-style"] = true, r["text-height"] = true, r["text-indent"] = true, r["text-justify"] = true, r["text-orientation"] = true, r["text-overflow"] = true, r["text-shadow"] = true, r["text-space-collapse"] = true, r["text-transform"] = true, r["text-underline-position"] = true, r["text-wrap"] = true, r.top = false, r.transform = false, r["transform-origin"] = false, r["transform-style"] = false, r.transition = false, r["transition-delay"] = false, r["transition-duration"] = false, r["transition-property"] = false, r["transition-timing-function"] = false, r["unicode-bidi"] = false, r["vertical-align"] = false, r.visibility = false, r["voice-balance"] = false, r["voice-duration"] = false, r["voice-family"] = false, r["voice-pitch"] = false, r["voice-range"] = false, r["voice-rate"] = false, r["voice-stress"] = false, r["voice-volume"] = false, r.volume = false, r["white-space"] = false, r.widows = false, r.width = true, r["will-change"] = false, r["word-break"] = true, r["word-spacing"] = true, r["word-wrap"] = true, r["wrap-flow"] = false, r["wrap-through"] = false, r["writing-mode"] = false, r["z-index"] = false, r;
    }
    function e(r, i, l) {
    }
    function o(r, i, l) {
    }
    var n = /javascript\s*\:/img;
    function s(r, i) {
      return n.test(i) ? "" : i;
    }
    return xe.whiteList = t(), xe.getDefaultWhiteList = t, xe.onAttr = e, xe.onIgnoreAttr = o, xe.safeAttrValue = s, xe;
  }
  var ur, mr;
  function Wr() {
    return mr || (mr = 1, ur = {
      indexOf: function(t, e) {
        var o, n;
        if (Array.prototype.indexOf) return t.indexOf(e);
        for (o = 0, n = t.length; o < n; o++) if (t[o] === e) return o;
        return -1;
      },
      forEach: function(t, e, o) {
        var n, s;
        if (Array.prototype.forEach) return t.forEach(e, o);
        for (n = 0, s = t.length; n < s; n++) e.call(o, t[n], n, t);
      },
      trim: function(t) {
        return String.prototype.trim ? t.trim() : t.replace(/(^\s*)|(\s*$)/g, "");
      },
      trimRight: function(t) {
        return String.prototype.trimRight ? t.trimRight() : t.replace(/(\s*$)/g, "");
      }
    }), ur;
  }
  var it, hr;
  function tc() {
    if (hr) return it;
    hr = 1;
    var t = Wr();
    function e(o, n) {
      o = t.trimRight(o), o[o.length - 1] !== ";" && (o += ";");
      var s = o.length, r = false, i = 0, l = 0, d = "";
      function u() {
        if (!r) {
          var h = t.trim(o.slice(i, l)), g = h.indexOf(":");
          if (g !== -1) {
            var b = t.trim(h.slice(0, g)), x = t.trim(h.slice(g + 1));
            if (b) {
              var v = n(i, d.length, b, x, h);
              v && (d += v + "; ");
            }
          }
        }
        i = l + 1;
      }
      for (; l < s; l++) {
        var p = o[l];
        if (p === "/" && o[l + 1] === "*") {
          var c = o.indexOf("*/", l + 2);
          if (c === -1) break;
          l = c + 1, i = l + 1, r = false;
        } else p === "(" ? r = true : p === ")" ? r = false : p === ";" ? r || u() : p === `
` && u();
      }
      return t.trim(d);
    }
    return it = e, it;
  }
  var at, fr;
  function rc() {
    if (fr) return at;
    fr = 1;
    var t = qr(), e = tc();
    Wr();
    function o(r) {
      return r == null;
    }
    function n(r) {
      var i = {};
      for (var l in r) i[l] = r[l];
      return i;
    }
    function s(r) {
      r = n(r || {}), r.whiteList = r.whiteList || t.whiteList, r.onAttr = r.onAttr || t.onAttr, r.onIgnoreAttr = r.onIgnoreAttr || t.onIgnoreAttr, r.safeAttrValue = r.safeAttrValue || t.safeAttrValue, this.options = r;
    }
    return s.prototype.process = function(r) {
      if (r = r || "", r = r.toString(), !r) return "";
      var i = this, l = i.options, d = l.whiteList, u = l.onAttr, p = l.onIgnoreAttr, c = l.safeAttrValue, h = e(r, function(g, b, x, v, w) {
        var y = d[x], T = false;
        if (y === true ? T = y : typeof y == "function" ? T = y(v) : y instanceof RegExp && (T = y.test(v)), T !== true && (T = false), v = c(x, v), !!v) {
          var k = {
            position: b,
            sourcePosition: g,
            source: w,
            isWhite: T
          };
          if (T) {
            var C = u(x, v, k);
            return o(C) ? x + ":" + v : C;
          } else {
            var C = p(x, v, k);
            if (!o(C)) return C;
          }
        }
      });
      return h;
    }, at = s, at;
  }
  var pr;
  function kt() {
    return pr || (pr = 1, (function(t, e) {
      var o = qr(), n = rc();
      function s(i, l) {
        var d = new n(l);
        return d.process(i);
      }
      e = t.exports = s, e.FilterCSS = n;
      for (var r in o) e[r] = o[r];
      typeof window < "u" && (window.filterCSS = t.exports);
    })(st, st.exports)), st.exports;
  }
  var gr, br;
  function Lt() {
    return br || (br = 1, gr = {
      indexOf: function(t, e) {
        var o, n;
        if (Array.prototype.indexOf) return t.indexOf(e);
        for (o = 0, n = t.length; o < n; o++) if (t[o] === e) return o;
        return -1;
      },
      forEach: function(t, e, o) {
        var n, s;
        if (Array.prototype.forEach) return t.forEach(e, o);
        for (n = 0, s = t.length; n < s; n++) e.call(o, t[n], n, t);
      },
      trim: function(t) {
        return String.prototype.trim ? t.trim() : t.replace(/(^\s*)|(\s*$)/g, "");
      },
      spaceIndex: function(t) {
        var e = /\s|\n|\t/, o = e.exec(t);
        return o ? o.index : -1;
      }
    }), gr;
  }
  var vr;
  function Br() {
    if (vr) return ee;
    vr = 1;
    var t = kt().FilterCSS, e = kt().getDefaultWhiteList, o = Lt();
    function n() {
      return {
        a: [
          "target",
          "href",
          "title"
        ],
        abbr: [
          "title"
        ],
        address: [],
        area: [
          "shape",
          "coords",
          "href",
          "alt"
        ],
        article: [],
        aside: [],
        audio: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "preload",
          "src"
        ],
        b: [],
        bdi: [
          "dir"
        ],
        bdo: [
          "dir"
        ],
        big: [],
        blockquote: [
          "cite"
        ],
        br: [],
        caption: [],
        center: [],
        cite: [],
        code: [],
        col: [
          "align",
          "valign",
          "span",
          "width"
        ],
        colgroup: [
          "align",
          "valign",
          "span",
          "width"
        ],
        dd: [],
        del: [
          "datetime"
        ],
        details: [
          "open"
        ],
        div: [],
        dl: [],
        dt: [],
        em: [],
        figcaption: [],
        figure: [],
        font: [
          "color",
          "size",
          "face"
        ],
        footer: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        header: [],
        hr: [],
        i: [],
        img: [
          "src",
          "alt",
          "title",
          "width",
          "height",
          "loading"
        ],
        ins: [
          "datetime"
        ],
        kbd: [],
        li: [],
        mark: [],
        nav: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        section: [],
        small: [],
        span: [],
        sub: [],
        summary: [],
        sup: [],
        strong: [],
        strike: [],
        table: [
          "width",
          "border",
          "align",
          "valign"
        ],
        tbody: [
          "align",
          "valign"
        ],
        td: [
          "width",
          "rowspan",
          "colspan",
          "align",
          "valign"
        ],
        tfoot: [
          "align",
          "valign"
        ],
        th: [
          "width",
          "rowspan",
          "colspan",
          "align",
          "valign"
        ],
        thead: [
          "align",
          "valign"
        ],
        tr: [
          "rowspan",
          "align",
          "valign"
        ],
        tt: [],
        u: [],
        ul: [],
        video: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "playsinline",
          "poster",
          "preload",
          "src",
          "height",
          "width"
        ]
      };
    }
    var s = new t();
    function r(j, M, L) {
    }
    function i(j, M, L) {
    }
    function l(j, M, L) {
    }
    function d(j, M, L) {
    }
    function u(j) {
      return j.replace(c, "&lt;").replace(h, "&gt;");
    }
    function p(j, M, L, W) {
      if (L = O(L), M === "href" || M === "src") {
        if (L = o.trim(L), L === "#") return "#";
        if (!(L.substr(0, 7) === "http://" || L.substr(0, 8) === "https://" || L.substr(0, 7) === "mailto:" || L.substr(0, 4) === "tel:" || L.substr(0, 11) === "data:image/" || L.substr(0, 6) === "ftp://" || L.substr(0, 2) === "./" || L.substr(0, 3) === "../" || L[0] === "#" || L[0] === "/")) return "";
      } else if (M === "background") {
        if (y.lastIndex = 0, y.test(L)) return "";
      } else if (M === "style") {
        if (T.lastIndex = 0, T.test(L) || (k.lastIndex = 0, k.test(L) && (y.lastIndex = 0, y.test(L)))) return "";
        W !== false && (W = W || s, L = W.process(L));
      }
      return L = R(L), L;
    }
    var c = /</g, h = />/g, g = /"/g, b = /&quot;/g, x = /&#([a-zA-Z0-9]*);?/gim, v = /&colon;?/gim, w = /&newline;?/gim, y = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi, T = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi, k = /u\s*r\s*l\s*\(.*/gi;
    function C(j) {
      return j.replace(g, "&quot;");
    }
    function I(j) {
      return j.replace(b, '"');
    }
    function N(j) {
      return j.replace(x, function(M, L) {
        return L[0] === "x" || L[0] === "X" ? String.fromCharCode(parseInt(L.substr(1), 16)) : String.fromCharCode(parseInt(L, 10));
      });
    }
    function $(j) {
      return j.replace(v, ":").replace(w, " ");
    }
    function S(j) {
      for (var M = "", L = 0, W = j.length; L < W; L++) M += j.charCodeAt(L) < 32 ? " " : j.charAt(L);
      return o.trim(M);
    }
    function O(j) {
      return j = I(j), j = N(j), j = $(j), j = S(j), j;
    }
    function R(j) {
      return j = C(j), j = u(j), j;
    }
    function A() {
      return "";
    }
    function H(j, M) {
      typeof M != "function" && (M = function() {
      });
      var L = !Array.isArray(j);
      function W(J) {
        return L ? true : o.indexOf(j, J) !== -1;
      }
      var V = [], X = false;
      return {
        onIgnoreTag: function(J, re, oe) {
          if (W(J)) if (oe.isClosing) {
            var Z = "[/removed]", pe = oe.position + Z.length;
            return V.push([
              X !== false ? X : oe.position,
              pe
            ]), X = false, Z;
          } else return X || (X = oe.position), "[removed]";
          else return M(J, re, oe);
        },
        remove: function(J) {
          var re = "", oe = 0;
          return o.forEach(V, function(Z) {
            re += J.slice(oe, Z[0]), oe = Z[1];
          }), re += J.slice(oe), re;
        }
      };
    }
    function F(j) {
      for (var M = "", L = 0; L < j.length; ) {
        var W = j.indexOf("<!--", L);
        if (W === -1) {
          M += j.slice(L);
          break;
        }
        M += j.slice(L, W);
        var V = j.indexOf("-->", W);
        if (V === -1) break;
        L = V + 3;
      }
      return M;
    }
    function P(j) {
      var M = j.split("");
      return M = M.filter(function(L) {
        var W = L.charCodeAt(0);
        return W === 127 ? false : W <= 31 ? W === 10 || W === 13 : true;
      }), M.join("");
    }
    return ee.whiteList = n(), ee.getDefaultWhiteList = n, ee.onTag = r, ee.onIgnoreTag = i, ee.onTagAttr = l, ee.onIgnoreTagAttr = d, ee.safeAttrValue = p, ee.escapeHtml = u, ee.escapeQuote = C, ee.unescapeQuote = I, ee.escapeHtmlEntities = N, ee.escapeDangerHtml5Entities = $, ee.clearNonPrintableCharacter = S, ee.friendlyAttrValue = O, ee.escapeAttrValue = R, ee.onIgnoreTagStripAll = A, ee.StripTagBody = H, ee.stripCommentTag = F, ee.stripBlankChar = P, ee.attributeWrapSign = '"', ee.cssFilter = s, ee.getDefaultCSSWhiteList = e, ee;
  }
  var qe = {}, xr;
  function Vr() {
    if (xr) return qe;
    xr = 1;
    var t = Lt();
    function e(c) {
      var h = t.spaceIndex(c), g;
      return h === -1 ? g = c.slice(1, -1) : g = c.slice(1, h + 1), g = t.trim(g).toLowerCase(), g.slice(0, 1) === "/" && (g = g.slice(1)), g.slice(-1) === "/" && (g = g.slice(0, -1)), g;
    }
    function o(c) {
      return c.slice(0, 2) === "</";
    }
    function n(c, h, g) {
      var b = "", x = 0, v = false, w = false, y = 0, T = c.length, k = "", C = "";
      e: for (y = 0; y < T; y++) {
        var I = c.charAt(y);
        if (v === false) {
          if (I === "<") {
            v = y;
            continue;
          }
        } else if (w === false) {
          if (I === "<") {
            b += g(c.slice(x, y)), v = y, x = y;
            continue;
          }
          if (I === ">" || y === T - 1) {
            b += g(c.slice(x, v)), C = c.slice(v, y + 1), k = e(C), b += h(v, b.length, k, C, o(C)), x = y + 1, v = false;
            continue;
          }
          if (I === '"' || I === "'") for (var N = 1, $ = c.charAt(y - N); $.trim() === "" || $ === "="; ) {
            if ($ === "=") {
              w = I;
              continue e;
            }
            $ = c.charAt(y - ++N);
          }
        } else if (I === w) {
          w = false;
          continue;
        }
      }
      return x < T && (b += g(c.substr(x))), b;
    }
    var s = /[^a-zA-Z0-9\\_:.-]/gim;
    function r(c, h) {
      var g = 0, b = 0, x = [], v = false, w = c.length;
      function y(N, $) {
        if (N = t.trim(N), N = N.replace(s, "").toLowerCase(), !(N.length < 1)) {
          var S = h(N, $ || "");
          S && x.push(S);
        }
      }
      for (var T = 0; T < w; T++) {
        var k = c.charAt(T), C, I;
        if (v === false && k === "=") {
          v = c.slice(g, T), g = T + 1, b = c.charAt(g) === '"' || c.charAt(g) === "'" ? g : l(c, T + 1);
          continue;
        }
        if (v !== false && T === b) {
          if (I = c.indexOf(k, T + 1), I === -1) break;
          C = t.trim(c.slice(b + 1, I)), y(v, C), v = false, T = I, g = T + 1;
          continue;
        }
        if (/\s|\n|\t/.test(k)) if (c = c.replace(/\s|\n|\t/g, " "), v === false) if (I = i(c, T), I === -1) {
          C = t.trim(c.slice(g, T)), y(C), v = false, g = T + 1;
          continue;
        } else {
          T = I - 1;
          continue;
        }
        else if (I = d(c, T - 1), I === -1) {
          C = t.trim(c.slice(g, T)), C = p(C), y(v, C), v = false, g = T + 1;
          continue;
        } else continue;
      }
      return g < c.length && (v === false ? y(c.slice(g)) : y(v, p(t.trim(c.slice(g))))), t.trim(x.join(" "));
    }
    function i(c, h) {
      for (; h < c.length; h++) {
        var g = c[h];
        if (g !== " ") return g === "=" ? h : -1;
      }
    }
    function l(c, h) {
      for (; h < c.length; h++) {
        var g = c[h];
        if (g !== " ") return g === "'" || g === '"' ? h : -1;
      }
    }
    function d(c, h) {
      for (; h > 0; h--) {
        var g = c[h];
        if (g !== " ") return g === "=" ? h : -1;
      }
    }
    function u(c) {
      return c[0] === '"' && c[c.length - 1] === '"' || c[0] === "'" && c[c.length - 1] === "'";
    }
    function p(c) {
      return u(c) ? c.substr(1, c.length - 2) : c;
    }
    return qe.parseTag = n, qe.parseAttr = r, qe;
  }
  var lt, yr;
  function oc() {
    if (yr) return lt;
    yr = 1;
    var t = kt().FilterCSS, e = Br(), o = Vr(), n = o.parseTag, s = o.parseAttr, r = Lt();
    function i(c) {
      return c == null;
    }
    function l(c) {
      var h = r.spaceIndex(c);
      if (h === -1) return {
        html: "",
        closing: c[c.length - 2] === "/"
      };
      c = r.trim(c.slice(h + 1, -1));
      var g = c[c.length - 1] === "/";
      return g && (c = r.trim(c.slice(0, -1))), {
        html: c,
        closing: g
      };
    }
    function d(c) {
      var h = {};
      for (var g in c) h[g] = c[g];
      return h;
    }
    function u(c) {
      var h = {};
      for (var g in c) Array.isArray(c[g]) ? h[g.toLowerCase()] = c[g].map(function(b) {
        return b.toLowerCase();
      }) : h[g.toLowerCase()] = c[g];
      return h;
    }
    function p(c) {
      c = d(c || {}), c.stripIgnoreTag && (c.onIgnoreTag && console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'), c.onIgnoreTag = e.onIgnoreTagStripAll), c.whiteList || c.allowList ? c.whiteList = u(c.whiteList || c.allowList) : c.whiteList = e.whiteList, this.attributeWrapSign = c.singleQuotedAttributeValue === true ? "'" : e.attributeWrapSign, c.onTag = c.onTag || e.onTag, c.onTagAttr = c.onTagAttr || e.onTagAttr, c.onIgnoreTag = c.onIgnoreTag || e.onIgnoreTag, c.onIgnoreTagAttr = c.onIgnoreTagAttr || e.onIgnoreTagAttr, c.safeAttrValue = c.safeAttrValue || e.safeAttrValue, c.escapeHtml = c.escapeHtml || e.escapeHtml, this.options = c, c.css === false ? this.cssFilter = false : (c.css = c.css || {}, this.cssFilter = new t(c.css));
    }
    return p.prototype.process = function(c) {
      if (c = c || "", c = c.toString(), !c) return "";
      var h = this, g = h.options, b = g.whiteList, x = g.onTag, v = g.onIgnoreTag, w = g.onTagAttr, y = g.onIgnoreTagAttr, T = g.safeAttrValue, k = g.escapeHtml, C = h.attributeWrapSign, I = h.cssFilter;
      g.stripBlankChar && (c = e.stripBlankChar(c)), g.allowCommentTag || (c = e.stripCommentTag(c));
      var N = false;
      g.stripIgnoreTagBody && (N = e.StripTagBody(g.stripIgnoreTagBody, v), v = N.onIgnoreTag);
      var $ = n(c, function(S, O, R, A, H) {
        var F = {
          sourcePosition: S,
          position: O,
          isClosing: H,
          isWhite: Object.prototype.hasOwnProperty.call(b, R)
        }, P = x(R, A, F);
        if (!i(P)) return P;
        if (F.isWhite) {
          if (F.isClosing) return "</" + R + ">";
          var j = l(A), M = b[R], L = s(j.html, function(W, V) {
            var X = r.indexOf(M, W) !== -1, J = w(R, W, V, X);
            return i(J) ? X ? (V = T(R, W, V, I), V ? W + "=" + C + V + C : W) : (J = y(R, W, V, X), i(J) ? void 0 : J) : J;
          });
          return A = "<" + R, L && (A += " " + L), j.closing && (A += " /"), A += ">", A;
        } else return P = v(R, A, F), i(P) ? k(A) : P;
      }, k);
      return N && ($ = N.remove($)), $;
    }, lt = p, lt;
  }
  var wr;
  function nc() {
    return wr || (wr = 1, (function(t, e) {
      var o = Br(), n = Vr(), s = oc();
      function r(l, d) {
        var u = new s(d);
        return u.process(l);
      }
      e = t.exports = r, e.filterXSS = r, e.FilterXSS = s, (function() {
        for (var l in o) e[l] = o[l];
        for (var d in n) e[d] = n[d];
      })(), typeof window < "u" && (window.filterXSS = t.exports);
      function i() {
        return typeof self < "u" && typeof DedicatedWorkerGlobalScope < "u" && self instanceof DedicatedWorkerGlobalScope;
      }
      i() && (self.filterXSS = t.exports);
    })(nt, nt.exports)), nt.exports;
  }
  var ze = nc();
  let sc, ic, kr, lc;
  sc = ec(ze);
  ic = Yl({
    __proto__: null,
    default: sc
  }, [
    ze
  ]);
  kr = {
    img: [
      "class"
    ],
    input: [
      "class",
      "disabled",
      "type",
      "checked"
    ],
    iframe: [
      "class",
      "width",
      "height",
      "src",
      "title",
      "border",
      "frameborder",
      "framespacing",
      "allow",
      "allowfullscreen"
    ]
  };
  ac = (t, e) => {
    const { extendedWhiteList: o = {}, xss: n = {} } = e;
    let s;
    if (typeof n == "function") s = new ze.FilterXSS(n(ic));
    else {
      const r = ze.getDefaultWhiteList();
      [
        ...Object.keys(o),
        ...Object.keys(kr)
      ].forEach((i) => {
        const l = r[i] || [], d = kr[i] || [], u = o[i] || [];
        r[i] = [
          .../* @__PURE__ */ new Set([
            ...l,
            ...d,
            ...u
          ])
        ];
      }), s = new ze.FilterXSS({
        whiteList: r,
        ...n
      });
    }
    t.core.ruler.after("linkify", "xss", (r) => {
      for (let i = 0; i < r.tokens.length; i++) {
        const l = r.tokens[i];
        switch (l.type) {
          case "html_block": {
            l.content = s.process(l.content);
            break;
          }
          case "inline": {
            (l.children || []).forEach((d) => {
              d.type === "html_inline" && (d.content = s.process(d.content));
            });
            break;
          }
        }
      }
    });
  };
  lc = () => {
    Object.keys(se).forEach((t) => {
      const e = document.getElementById(se[t]);
      e && e.remove();
    });
  };
  pc = Object.freeze(Object.defineProperty({
    __proto__: null,
    DropdownToolbar: Wl,
    MdCatalog: Lr,
    MdEditor: _l,
    MdModal: St,
    MdPreview: Kl,
    ModalToolbar: Vl,
    NormalFooterToolbar: Jl,
    NormalToolbar: Dl,
    StrIcon: me,
    XSSPlugin: ac,
    allFooter: Et,
    allToolbar: Ct,
    clearSideEffects: lc,
    config: So,
    editorExtensionsAttrs: Eo,
    en_US: Xl,
    prefix: m,
    zh_CN: Zl
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  cc = {
    toolbarTips: {
      bold: "\uC9C4\uD558\uAC8C",
      underline: "\uBC11\uC904",
      italic: "\uAE30\uC6B8\uC784",
      strikeThrough: "\uCDE8\uC18C\uC120",
      title: "\uC81C\uBAA9",
      sub: "\uC544\uB798\uCCA8\uC790",
      sup: "\uC717\uCCA8\uC790",
      quote: "\uC778\uC6A9",
      unorderedList: "\uBAA9\uB85D",
      orderedList: "\uBC88\uD638\uC640 \uBAA9\uB85D",
      task: "\uD560\uC77C",
      codeRow: "\uCF54\uB4DC",
      code: "\uCF54\uB4DC \uBE14\uB7ED",
      link: "\uB9C1\uD06C",
      image: "\uC0AC\uC9C4",
      table: "\uD45C",
      mermaid: "Mermaid",
      katex: "\uC218\uC2DD",
      revoke: "\uC2E4\uD589 \uCDE8\uC18C",
      next: "\uB2E4\uC2DC \uC2E4\uD589",
      save: "\uC800\uC7A5",
      prettier: "\uB0B4\uC6A9 \uC815\uB9AC",
      pageFullscreen: "\uD398\uC774\uC9C0 \uC804\uCCB4\uD654\uBA74",
      fullscreen: "\uC804\uCCB4\uD654\uBA74",
      preview: "\uBBF8\uB9AC\uBCF4\uAE30",
      previewOnly: "\uBBF8\uB9AC\uBCF4\uAE30\uB9CC",
      htmlPreview: "HTML \uBBF8\uB9AC\uBCF4\uAE30",
      catalog: "\uCE74\uD0C8\uB85C\uADF8",
      github: "\uC18C\uC2A4\uCF54\uB4DC"
    },
    titleItem: {
      h1: "Lv1 \uC81C\uBAA9",
      h2: "Lv2 \uC81C\uBAA9",
      h3: "Lv3 \uC81C\uBAA9",
      h4: "Lv4 \uC81C\uBAA9",
      h5: "Lv5 \uC81C\uBAA9",
      h6: "Lv6 \uC81C\uBAA9"
    },
    imgTitleItem: {
      link: "\uC774\uBBF8\uC9C0 \uB9C1\uD06C \uCD94\uAC00",
      upload: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC",
      clip2upload: "\uC798\uB77C\uC11C \uC5C5\uB85C\uB4DC"
    },
    linkModalTips: {
      linkTitle: "\uB9C1\uD06C \uCD94\uAC00",
      imageTitle: "\uC774\uBBF8\uC9C0 \uCD94\uAC00",
      descLabel: "\uC124\uBA85:",
      descLabelPlaceHolder: "\uC124\uBA85 \uC785\uB825...",
      urlLabel: "\uB9C1\uD06C:",
      urlLabelPlaceHolder: "\uB9C1\uD06C \uC785\uB825...",
      buttonOK: "\uD655\uC778"
    },
    clipModalTips: {
      title: "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30",
      buttonUpload: "\uC5C5\uB85C\uB4DC"
    },
    copyCode: {
      text: "\uBCF5\uC0AC",
      successTips: "\uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4!",
      failTips: "\uBCF5\uC0AC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4!"
    },
    mermaid: {
      flow: "\uD750\uB984",
      sequence: "\uC21C\uC11C",
      gantt: "\uAC04\uD2B8",
      class: "\uD074\uB798\uC2A4",
      state: "\uC0C1\uD0DC",
      pie: "\uD30C\uC774",
      relationship: "\uAD00\uACC4",
      journey: "\uC5EC\uC815"
    },
    katex: {
      inline: "\uC218\uC2DD",
      block: "\uC218\uC2DD \uBE14\uB7ED"
    },
    footer: {
      markdownTotal: "\uAE00\uC790 \uC218",
      scrollAuto: "\uC790\uB3D9 \uC2A4\uD06C\uB864"
    }
  };
  gc = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: cc
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  cc as K,
  ac as N,
  __tla,
  Wl as h,
  pc as i,
  gc as k
};
