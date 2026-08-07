import{ew as p,ey as F}from"./index-wQ3GJHns.js";function fe(e){if(p("collect:incoming",{hasData:!!e,filesLength:e?.files?.length??0,itemsLength:e?.items?.length??0}),!e)return p("collect:result",{count:0,reason:"no data"}),[];const r=[],t=new Set,n=i=>{if(!i||!i.size)return;const a=String(i.size);t.has(a)||(t.add(a),r.push(i))};if(e.files?.length)for(const i of e.files)i&&(i.type?.startsWith("image/")||!i.type&&i.size>0)&&n(i);if(e.items)for(const i of e.items){if(i.kind!=="file")continue;const a=i.type||"";if(a.startsWith("image/")||a===""){const s=i.getAsFile();s&&n(s)}}return p("collect:result",{count:r.length,files:F(r)}),r}function $(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function v(e,r){return Array(r+1).join(e)}function b(e){return e.replace(/^\n*/,"")}function S(e){for(var r=e.length;r>0&&e[r-1]===`
`;)r--;return e.substring(0,r)}function w(e){return S(b(e))}var V=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function A(e){return N(e,V)}var O=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function D(e){return N(e,O)}function W(e){return L(e,O)}var B=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function U(e){return N(e,B)}function _(e){return L(e,B)}function N(e,r){return r.indexOf(e.nodeName)>=0}function L(e,r){return e.getElementsByTagName&&r.some(function(t){return e.getElementsByTagName(t).length})}var j=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function P(e){return j.reduce(function(r,t){return r.replace(t[0],t[1])},e)}var o={};o.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};o.lineBreak={filter:"br",replacement:function(e,r,t){return t.br+`
`}};o.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,r,t){var n=Number(r.nodeName.charAt(1));if(t.headingStyle==="setext"&&n<3){var i=v(n===1?"=":"-",e.length);return`

`+e+`
`+i+`

`}else return`

`+v("#",n)+" "+e+`

`}};o.blockquote={filter:"blockquote",replacement:function(e){return e=w(e).replace(/^/gm,"> "),`

`+e+`

`}};o.list={filter:["ul","ol"],replacement:function(e,r){var t=r.parentNode;return t.nodeName==="LI"&&t.lastElementChild===r?`
`+e:`

`+e+`

`}};o.listItem={filter:"li",replacement:function(e,r,t){var n=t.bulletListMarker+"   ",i=r.parentNode;if(i.nodeName==="OL"){var a=i.getAttribute("start"),s=Array.prototype.indexOf.call(i.children,r);n=(a?Number(a)+s:s+1)+".  "}var f=/\n$/.test(e);return e=w(e)+(f?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(n.length)),n+e+(r.nextSibling?`
`:"")}};o.indentedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){return`

    `+r.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};o.fencedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){for(var n=r.firstChild.getAttribute("class")||"",i=(n.match(/language-(\S+)/)||[null,""])[1],a=r.firstChild.textContent,s=t.fence.charAt(0),f=3,l=new RegExp("^"+s+"{3,}","gm"),u;u=l.exec(a);)u[0].length>=f&&(f=u[0].length+1);var c=v(s,f);return`

`+c+i+`
`+a.replace(/\n$/,"")+`
`+c+`

`}};o.horizontalRule={filter:"hr",replacement:function(e,r,t){return`

`+t.hr+`

`}};o.inlineLink={filter:function(e,r){return r.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r){var t=k(r.getAttribute("href")),n=E(h(r.getAttribute("title"))),i=n?' "'+n+'"':"";return"["+e+"]("+t+i+")"}};o.referenceLink={filter:function(e,r){return r.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r,t){var n=k(r.getAttribute("href")),i=h(r.getAttribute("title"));i&&(i=' "'+E(i)+'"');var a,s;switch(t.linkReferenceStyle){case"collapsed":a="["+e+"][]",s="["+e+"]: "+n+i;break;case"shortcut":a="["+e+"]",s="["+e+"]: "+n+i;break;default:var f=this.references.length+1;a="["+e+"]["+f+"]",s="["+f+"]: "+n+i}return this.references.push(s),a},references:[],append:function(e){var r="";return this.references.length&&(r=`

`+this.references.join(`
`)+`

`,this.references=[]),r}};o.emphasis={filter:["em","i"],replacement:function(e,r,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};o.strong={filter:["strong","b"],replacement:function(e,r,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};o.code={filter:function(e){var r=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!r;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var r=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",n=e.match(/`+/gm)||[];n.indexOf(t)!==-1;)t=t+"`";return t+r+e+r+t}};o.image={filter:"img",replacement:function(e,r){var t=P(h(r.getAttribute("alt"))),n=k(r.getAttribute("src")||""),i=h(r.getAttribute("title")),a=i?' "'+E(i)+'"':"";return n?"!["+t+"]("+n+a+")":""}};function h(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function k(e){var r=e.replace(/([<>()])/g,"\\$1");return r.indexOf(" ")>=0?"<"+r+">":r}function E(e){return e.replace(/"/g,'\\"')}function x(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var r in e.rules)this.array.push(e.rules[r])}x.prototype={add:function(e,r){this.array.unshift(r)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var r;return(r=m(this.array,e,this.options))||(r=m(this._keep,e,this.options))||(r=m(this._remove,e,this.options))?r:this.defaultRule},forEach:function(e){for(var r=0;r<this.array.length;r++)e(this.array[r],r)}};function m(e,r,t){for(var n=0;n<e.length;n++){var i=e[n];if(z(i,r,t))return i}}function z(e,r,t){var n=e.filter;if(typeof n=="string"){if(n===r.nodeName.toLowerCase())return!0}else if(Array.isArray(n)){if(n.indexOf(r.nodeName.toLowerCase())>-1)return!0}else if(typeof n=="function"){if(n.call(e,r,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function G(e){var r=e.element,t=e.isBlock,n=e.isVoid,i=e.isPre||function(H){return H.nodeName==="PRE"};if(!(!r.firstChild||i(r))){for(var a=null,s=!1,f=null,l=C(f,r,i);l!==r;){if(l.nodeType===3||l.nodeType===4){var u=l.data.replace(/[ \r\n\t]+/g," ");if((!a||/ $/.test(a.data))&&!s&&u[0]===" "&&(u=u.substr(1)),!u){l=g(l);continue}l.data=u,a=l}else if(l.nodeType===1)t(l)||l.nodeName==="BR"?(a&&(a.data=a.data.replace(/ $/,"")),a=null,s=!1):n(l)||i(l)?(a=null,s=!0):a&&(s=!1);else{l=g(l);continue}var c=C(f,l,i);f=l,l=c}a&&(a.data=a.data.replace(/ $/,""),a.data||g(a))}}function g(e){var r=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),r}function C(e,r,t){return e&&e.parentNode===r||t(r)?r.nextSibling||r.parentNode:r.firstChild||r.nextSibling||r.parentNode}var T=typeof window<"u"?window:{};function X(){var e=T.DOMParser,r=!1;try{new e().parseFromString("","text/html")&&(r=!0)}catch{}return r}function K(){var e=function(){};return Y()?e.prototype.parseFromString=function(r){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(r),t.close(),t}:e.prototype.parseFromString=function(r){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(r),t.close(),t},e}function Y(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{T.ActiveXObject&&(e=!0)}return e}var q=X()?T.DOMParser:K();function Q(e,r){var t;if(typeof e=="string"){var n=J().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=n.getElementById("turndown-root")}else t=e.cloneNode(!0);return G({element:t,isBlock:A,isVoid:D,isPre:r.preformattedCode?Z:null}),t}var d;function J(){return d=d||new q,d}function Z(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function ee(e,r){return e.isBlock=A(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=re(e),e.flankingWhitespace=te(e,r),e}function re(e){return!D(e)&&!U(e)&&/^\s*$/i.test(e.textContent)&&!W(e)&&!_(e)}function te(e,r){if(e.isBlock||r.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=ne(e.textContent);return t.leadingAscii&&R("left",e,r)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&R("right",e,r)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function ne(e){var r=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:r[1],leadingAscii:r[2],leadingNonAscii:r[3],trailing:r[4],trailingNonAscii:r[5],trailingAscii:r[6]}}function R(e,r,t){var n,i,a;return e==="left"?(n=r.previousSibling,i=/ $/):(n=r.nextSibling,i=/^ /),n&&(n.nodeType===3?a=i.test(n.nodeValue):t.preformattedCode&&n.nodeName==="CODE"?a=!1:n.nodeType===1&&!A(n)&&(a=i.test(n.textContent))),a}var ie=Array.prototype.reduce;function y(e){if(!(this instanceof y))return new y(e);var r={rules:o,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,n){return n.isBlock?`

`:""},keepReplacement:function(t,n){return n.isBlock?`

`+n.outerHTML+`

`:n.outerHTML},defaultReplacement:function(t,n){return n.isBlock?`

`+t+`

`:t}};this.options=$({},r,e),this.rules=new x(this.options)}y.prototype={turndown:function(e){if(!se(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var r=M.call(this,new Q(e,this.options));return ae.call(this,r)},use:function(e){if(Array.isArray(e))for(var r=0;r<e.length;r++)this.use(e[r]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,r){return this.rules.add(e,r),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return P(e)}};function M(e){var r=this;return ie.call(e.childNodes,function(t,n){n=new ee(n,r.options);var i="";return n.nodeType===3?i=n.isCode?n.nodeValue:r.escape(n.nodeValue):n.nodeType===1&&(i=le.call(r,n)),I(t,i)},"")}function ae(e){var r=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=I(e,t.append(r.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function le(e){var r=this.rules.forNode(e),t=M.call(this,e),n=e.flankingWhitespace;return(n.leading||n.trailing)&&(t=t.trim()),n.leading+r.replacement(t,e,this.options)+n.trailing}function I(e,r){var t=S(e),n=b(r),i=Math.max(e.length-t.length,r.length-n.length),a=`

`.substring(0,i);return t+a+n}function se(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}export{y as T,fe as c};
