import{r as l,j as e}from"./vendor-react-CilcuO6o.js";import N from"./MonacoTextEditor-72PZFDR-.js";import{ao as T,a6 as _,ap as W}from"./index-DXXJ2FJE.js";import{E as V,g as D,aC as P}from"./vendor-lucide-TO1x1dmk.js";import"./vendor-monaco-De7zAa1m.js";import"./vendor-md-editor-JJ_gb3xq.js";import"./vendor-aws-BtMV4y99.js";import"./vendor-motion-BkQ6fGAi.js";import"./vendor-radix-CVYFRpR6.js";import"./vendor-zip-Bez6qchM.js";const n=["dual","editor","preview"],z="s3haim_html_svg_preview_width",R=280;function C(i,t){return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    background: ${t==="dark"?"#0f1419":"#ffffff"};
    color: ${t==="dark"?"#e7e9ea":"#111827"};
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    box-sizing: border-box;
    padding: 1rem;
  }
  body > svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
</head>
<body>${i??""}</body>
</html>`}function w(i,t,r){return t==="svg"?C(i,r):i??""}const b={dual:{label:"양면보기",icon:P,title:"양면보기 (다음: 텍스트에디터)"},editor:{label:"텍스트에디터",icon:D,title:"텍스트에디터 (다음: 미리보기)"},preview:{label:"미리보기",icon:V,title:"미리보기 (다음: 양면보기)"}};function A({value:i="",mode:t="html",theme:r="light",readOnly:c=!1,onChange:g,onSave:x}){const[o,p]=l.useState("dual"),[m,u]=l.useState(()=>w(i,t,r)),{width:v,isResizing:y,handleProps:E}=T({storageKey:z,defaultWidth:480,minWidth:200,maxWidth:960,edge:"right"}),j=t==="svg"?"xml":"html",a=o==="dual"||o==="editor",h=o==="dual"||o==="preview";l.useEffect(()=>{const d=window.setTimeout(()=>{u(w(i,t,r))},R);return()=>window.clearTimeout(d)},[i,t,r]);const S=()=>{p(d=>{const k=n.indexOf(d);return n[(k+1)%n.length]})},s=b[o]??b.dual,M=s.icon,f=l.useMemo(()=>t==="svg"?"SVG preview":"HTML preview",[t]);return e.jsxs("div",{className:"flex h-full min-h-0 flex-1 flex-col overflow-hidden",children:[e.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-50/90 px-3 py-1.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90",role:"toolbar","aria-label":t==="svg"?"SVG editor":"HTML editor",children:[e.jsx("span",{className:"text-xs font-medium text-gray-600 dark:text-odp-muted",children:t==="svg"?"SVG":"HTML"}),e.jsxs(_,{type:"button",variant:"secondary",size:"sm",onClick:S,title:s.title,"aria-label":s.title,children:[e.jsx(M,{size:14,"aria-hidden":!0}),e.jsxs("span",{className:"hidden sm:inline",children:[" ",s.label]})]})]}),e.jsxs("div",{className:"flex min-h-0 flex-1 overflow-hidden",children:[a&&e.jsx("div",{className:"flex min-h-0 min-w-0 flex-1 flex-col p-2",children:e.jsx(N,{value:i,language:j,theme:r,readOnly:c,onChange:g,onSave:x})}),a&&h&&e.jsxs("div",{className:"relative shrink-0 border-l border-gray-200 dark:border-odp-borderSoft",style:{width:v},children:[e.jsx(W,{handleProps:E,isResizing:y,label:"Resize preview panel"}),e.jsx("iframe",{title:f,srcDoc:m,sandbox:"allow-scripts allow-forms allow-modals",className:"h-full w-full border-0 bg-white dark:bg-odp-bg"})]}),!a&&h&&e.jsx("div",{className:"min-h-0 min-w-0 flex-1 overflow-hidden",children:e.jsx("iframe",{title:f,srcDoc:m,sandbox:"allow-scripts allow-forms allow-modals",className:"h-full w-full border-0 bg-white dark:bg-odp-bg"})})]})]})}export{A as default};
