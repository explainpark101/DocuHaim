const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-image-crop-D1-zYRQd.js","assets/vendor-react-CilcuO6o.js"])))=>i.map(i=>d[i]);
import{_ as T}from"./vendor-md-editor-D1dBZJUQ.js";import{r as a,j as n}from"./vendor-react-CilcuO6o.js";import{f as A}from"./storageImageHydration-CXwD5pn8.js";import{v as P,b6 as D,aG as Y}from"./vendor-lucide-Dz2ifc48.js";import{G as M,H as O}from"./vendor-radix-CLCsAtqc.js";import"./index-Dxc7Hpw0.js";import"./vendor-aws-s_i6TC5I.js";import"./vendor-motion-BkQ6fGAi.js";import"./vendor-zip-Bez6qchM.js";const $="relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500",X="block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]",B={backgroundColor:"#ffffff",backgroundImage:["linear-gradient(45deg, #d4d4d4 25%, transparent 25%)","linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)","linear-gradient(45deg, transparent 75%, #d4d4d4 75%)","linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)"].join(","),backgroundSize:"16px 16px",backgroundPosition:"0 0, 0 8px, 8px -8px, -8px 0px"},G=`
<cropper-canvas background style="width:100%;height:100%;">
  <cropper-image rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.85" movable resizable outlined>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
    <cropper-handle action="move" plain></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="nw-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="se-resize" theme-color="#3b82f6"></cropper-handle>
    <cropper-handle action="sw-resize" theme-color="#3b82f6"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
`,F=`
:host([action="ne-resize"]),
:host([action="nw-resize"]),
:host([action="se-resize"]),
:host([action="sw-resize"]) {
  height: 28px;
  width: 28px;
  z-index: 2;
}
:host([action="ne-resize"]):after,
:host([action="nw-resize"]):after,
:host([action="se-resize"]):after,
:host([action="sw-resize"]):after {
  height: 14px;
  width: 14px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9);
}
:host([action="ne-resize"]) { top: -12px; right: -12px; }
:host([action="nw-resize"]) { top: -12px; left: -12px; }
:host([action="se-resize"]) { bottom: -12px; right: -12px; }
:host([action="sw-resize"]) { bottom: -12px; left: -12px; }
@media (pointer: coarse) {
  :host([action="ne-resize"]),
  :host([action="nw-resize"]),
  :host([action="se-resize"]),
  :host([action="sw-resize"]) {
    height: 36px;
    width: 36px;
  }
  :host([action="ne-resize"]):after,
  :host([action="nw-resize"]):after,
  :host([action="se-resize"]):after,
  :host([action="sw-resize"]):after {
    height: 16px;
    width: 16px;
  }
  :host([action="ne-resize"]) { top: -14px; right: -14px; }
  :host([action="nw-resize"]) { top: -14px; left: -14px; }
  :host([action="se-resize"]) { bottom: -14px; right: -14px; }
  :host([action="sw-resize"]) { bottom: -14px; left: -14px; }
}
`,H=new Set(["ne-resize","nw-resize","se-resize","sw-resize"]);function q(s){s&&s.querySelectorAll("cropper-handle").forEach(h=>{const u=h,g=u.getAttribute("action")||"";H.has(g)&&u.$addStyles?.(F)})}const S=1;function J(s,h){const u=h[0]??1,g=h[1]??0,p=Math.hypot(u,g)||1;return{width:Math.max(1,Math.round(s.width/p)),height:Math.max(1,Math.round(s.height/p))}}function oe({imageSrc:s,fileName:h,onCancel:u,onConfirm:g}){const p=a.useRef(null),k=a.useRef(null),d=a.useRef(null),[b,v]=a.useState(!1),[E,C]=a.useState(""),[w,j]=a.useState(!1),[I,N]=a.useState(""),[y,L]=a.useState(!0);a.useEffect(()=>{v(!1),C(""),j(!1),N(""),L(!0)},[s]),a.useEffect(()=>{let t=!1,r=null;const o=async()=>{v(!1),C("");try{const{default:i}=await T(async()=>{const{default:l}=await import("./vendor-image-crop-D1-zYRQd.js").then(m=>m.c);return{default:l}},__vite__mapDeps([0,1]));if(t||!k.current)return;d.current?.destroy(),d.current=null,r=new i(k.current,{...p.current?{container:p.current}:{},template:G});const c=r.getCropperImage();if(c&&await c.$ready(),t){r.destroy();return}q(r.getCropperSelection()),d.current=r,v(!0)}catch(i){t||C(i instanceof Error?i.message:"Cropper.js 2를 불러오지 못했습니다. bun install 후 다시 시도하세요.")}},f=window.requestAnimationFrame(()=>{o()});return()=>{t=!0,window.cancelAnimationFrame(f),r?.destroy(),d.current===r&&(d.current=null)}},[s]),a.useEffect(()=>{if(!b)return;const t=p.current,r=d.current;if(!t||!r)return;const o={active:!1,pointerId:-1,lastX:0,lastY:0},f=e=>{if(o.active){if(o.active=!1,e&&o.pointerId===e.pointerId)try{t.releasePointerCapture(e.pointerId)}catch{}o.pointerId=-1,t.style.cursor=""}},i=e=>{if(!(e.button!==S||(e.preventDefault(),e.stopPropagation(),!r.getCropperImage()))){o.active=!0,o.pointerId=e.pointerId,o.lastX=e.clientX,o.lastY=e.clientY;try{t.setPointerCapture(e.pointerId)}catch{}t.style.cursor="grabbing"}},c=e=>{if(!o.active||e.pointerId!==o.pointerId)return;e.preventDefault();const x=r.getCropperImage();if(!x)return;const z=e.clientX-o.lastX,R=e.clientY-o.lastY;o.lastX=e.clientX,o.lastY=e.clientY,(z!==0||R!==0)&&x.$move(z,R)},l=e=>{e.pointerId!==o.pointerId&&e.button!==S||f(e)},m=e=>{e.button===S&&(e.preventDefault(),e.stopPropagation())};return t.addEventListener("pointerdown",i,!0),t.addEventListener("pointermove",c,!0),t.addEventListener("pointerup",l,!0),t.addEventListener("pointercancel",l,!0),t.addEventListener("auxclick",m,!0),()=>{f(),t.removeEventListener("pointerdown",i,!0),t.removeEventListener("pointermove",c,!0),t.removeEventListener("pointerup",l,!0),t.removeEventListener("pointercancel",l,!0),t.removeEventListener("auxclick",m,!0)}},[b]);const _=async()=>{const t=d.current;if(!(!t||w||!b)){j(!0),N("");try{const r=t.getCropperSelection(),o=t.getCropperImage();if(!r||!o)throw new Error("자르기 영역을 찾을 수 없습니다.");const f=o.$getTransform(),i=J(r,f),c=await r.$toCanvas({width:i.width,height:i.height,...y?{}:{beforeDraw:(x,z)=>{x.fillStyle="#ffffff",x.fillRect(0,0,z.width,z.height)}}});if(!c||c.width<1||c.height<1)throw new Error("자른 영역을 만들 수 없습니다.");const l=(h||"image").replace(/\.[^.]+$/,"")||"image",{file:m,area:e}=await A(c,{keepTransparency:y,fileName:y?`${l}-crop.png`:`${l}-crop.jpg`});await g(m,{x:r.x,y:r.y,width:e.width,height:e.height})}catch(r){N(r instanceof Error?r.message:String(r)),j(!1)}}};return n.jsxs("div",{className:"flex min-h-0 flex-1 flex-col gap-3",children:[n.jsx("p",{className:"shrink-0 text-xs text-gray-500 dark:text-odp-muted",children:"Cropper.js 2 방식입니다. 박스를 드래그해 자르고, 휠로 확대·축소하세요. 휠 클릭(중클릭) 드래그로 배경 이미지를 패닝할 수 있습니다. 결과는 원본 해상도로 저장됩니다."}),n.jsxs("div",{ref:p,className:"relative min-h-[220px] w-full flex-1 overflow-hidden rounded-lg [&_cropper-canvas]:h-full! [&_cropper-canvas]:w-full!",style:y?B:{backgroundColor:"#ffffff"},children:[n.jsx("img",{ref:k,src:s,alt:"",className:"block max-h-full max-w-full",crossOrigin:"anonymous"},s),!b&&!E?n.jsxs("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-neutral-500 dark:bg-black/40 dark:text-neutral-300",children:[n.jsx(P,{size:18,className:"mr-2 animate-spin"}),"준비 중…"]}):null]}),n.jsxs("label",{className:"flex shrink-0 cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 dark:border-odp-borderSoft",children:[n.jsxs("span",{className:"min-w-0",children:[n.jsx("span",{className:"block text-xs font-medium text-gray-800 dark:text-odp-fgStrong",children:"PNG 투명 배경 유지"}),n.jsx("span",{className:"mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted",children:"끄면 흰 배경 JPEG로 저장합니다."})]}),n.jsx(M,{className:$,checked:y,onCheckedChange:t=>L(!!t),"aria-label":"PNG 투명 배경 유지",children:n.jsx(O,{className:X})})]}),E?n.jsx("p",{className:"shrink-0 text-xs text-red-600 dark:text-red-300",children:E}):null,I?n.jsx("p",{className:"shrink-0 text-xs text-red-600 dark:text-red-300",children:I}):null,n.jsxs("div",{className:"flex shrink-0 justify-end gap-2",children:[n.jsxs("button",{type:"button",onClick:u,disabled:w,className:"inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg",children:[n.jsx(D,{size:16}),"뒤로"]}),n.jsxs("button",{type:"button",onClick:()=>{_()},disabled:w||!b,className:"inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50",children:[w?n.jsx(P,{size:16,className:"animate-spin"}):n.jsx(Y,{size:16}),w?"적용 중…":"자르기 적용"]})]})]})}export{oe as default};
