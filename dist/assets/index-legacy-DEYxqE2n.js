System.register(["./index-legacy-9OZgdCRp.js"],(function(e,t){"use strict";var a,i,s,n,d,l,c,r,o,u,v,m,p,b,g,h,I;return{setters:[e=>{a=e.L,i=e.d,s=e.a6,n=e.g,d=e.S,l=e.a0,c=e.ak,r=e.aE,o=e.U,u=e.aF,v=e.aj,m=e.aG,p=e.Q,b=e.M,g=e.ay,h=e.a3,I=e.I}],execute:function(){const[t,f]=a("sidebar"),x=Symbol(t),A={modelValue:d(0)};var k=i({name:t,props:A,emits:["change","update:modelValue"],setup(e,{emit:t,slots:a}){const{linkChildren:i}=s(x),d=()=>+e.modelValue;return i({getActive:d,setActive:e=>{e!==d()&&(t("update:modelValue",e),t("change",e))}}),()=>{var e;return n("div",{role:"tablist",class:f()},[null==(e=a.default)?void 0:e.call(a)])}}});const y=l(k),[j,C]=a("sidebar-item"),S=c({},r,{dot:Boolean,title:String,badge:o,disabled:Boolean,badgeProps:Object});var V=i({name:j,props:S,emits:["click"],setup(e,{emit:t,slots:a}){const i=u(),{parent:s,index:d}=v(x);if(!s)return;const l=()=>{e.disabled||(t("click",d.value),s.setActive(d.value),i())};return()=>{const{dot:t,badge:i,title:c,disabled:r}=e,o=d.value===s.getActive();return n("div",{role:"tab",class:C({select:o,disabled:r}),tabindex:r?void 0:0,"aria-selected":o,onClick:l},[n(m,p({dot:t,class:C("text"),content:i},e.badgeProps),{default:()=>[a.title?a.title():c]})])}}});const N=l(V),[B,O]=a("tree-select"),P={max:d(1/0),items:g(),height:d(300),selectedIcon:h("success"),mainActiveIndex:d(0),activeId:{type:[Number,String,Array],default:0}};var E=i({name:B,props:P,emits:["clickNav","clickItem","update:activeId","update:mainActiveIndex"],setup(e,{emit:t,slots:a}){const i=t=>Array.isArray(e.activeId)?e.activeId.includes(t):e.activeId===t,s=a=>n("div",{key:a.id,class:["van-ellipsis",O("item",{active:i(a.id),disabled:a.disabled})],onClick:()=>{if(a.disabled)return;let i;if(Array.isArray(e.activeId)){i=e.activeId.slice();const t=i.indexOf(a.id);-1!==t?i.splice(t,1):i.length<+e.max&&i.push(a.id)}else i=a.id;t("update:activeId",i),t("clickItem",a)}},[a.text,i(a.id)&&n(I,{name:e.selectedIcon,class:O("selected")},null)]),d=e=>{t("update:mainActiveIndex",e)},l=e=>t("clickNav",e),c=()=>{const t=e.items.map((e=>n(N,{dot:e.dot,badge:e.badge,class:[O("nav-item"),e.className],disabled:e.disabled,onClick:l},{title:()=>a["nav-text"]?a["nav-text"](e):e.text})));return n(y,{class:O("nav"),modelValue:e.mainActiveIndex,onChange:d},{default:()=>[t]})},r=()=>{if(a.content)return a.content();const t=e.items[+e.mainActiveIndex]||{};return t.children?t.children.map(s):void 0};return()=>n("div",{class:O(),style:{height:b(e.height)}},[c(),n("div",{class:O("content")},[r()])])}});e("T",l(E)),e("f",(function(e){for(var t,a=e.length,i=a%3,s=[],n=16383,d=0,l=a-i;d<l;d+=n)s.push(M(e,d,d+n>l?l:d+n));return 1===i?(t=e[a-1],s.push(F[t>>2]+F[t<<4&63]+"==")):2===i&&(t=(e[a-2]<<8)+e[a-1],s.push(F[t>>10]+F[t>>4&63]+F[t<<2&63]+"=")),s.join("")}));for(var F=[],G="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",L=0;L<64;++L)F[L]=G[L];function M(e,t,a){for(var i,s,n=[],d=t;d<a;d+=3)i=(e[d]<<16&16711680)+(e[d+1]<<8&65280)+(255&e[d+2]),n.push(F[(s=i)>>18&63]+F[s>>12&63]+F[s>>6&63]+F[63&s]);return n.join("")}}}}));
