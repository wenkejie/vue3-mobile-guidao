System.register(["./index-legacy-9OZgdCRp.js"],(function(r,o){"use strict";var e,i,a,l,n,t,s,c,u,d,v,g,f,h,y,p,m,w,S,b,z;return{setters:[r=>{e=r.L,i=r.d,a=r.r,l=r.as,n=r.c,t=r.M,s=r.W,c=r.w,u=r.at,d=r.ai,v=r.q,g=r.J,f=r.g,h=r.U,y=r.T,p=r.a3,m=r.G,w=r.au,S=r.Q,b=r.I,z=r.a0}],execute:function(){const[o,L]=e("image"),x={src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:h,height:h,radius:h,lazyLoad:Boolean,iconSize:h,showError:y,errorIcon:p("photo-fail"),iconPrefix:String,showLoading:y,loadingIcon:p("photo"),crossorigin:String,referrerpolicy:String};var I=i({name:o,props:x,emits:["load","error"],setup(r,{emit:o,slots:e}){const i=a(!1),h=a(!0),y=a(),{$Lazyload:p}=l().proxy,z=n((()=>{const o={width:t(r.width),height:t(r.height)};return s(r.radius)&&(o.overflow="hidden",o.borderRadius=t(r.radius)),o}));c((()=>r.src),(()=>{i.value=!1,h.value=!0}));const x=r=>{h.value&&(h.value=!1,o("load",r))},I=()=>{const r=new Event("load");Object.defineProperty(r,"target",{value:y.value,enumerable:!0}),x(r)},P=r=>{i.value=!0,h.value=!1,o("error",r)},$=(o,e,i)=>i?i():f(b,{name:o,size:r.iconSize,class:e,classPrefix:r.iconPrefix},null),j=()=>{if(i.value||!r.src)return;const o={alt:r.alt,class:L("img"),style:{objectFit:r.fit,objectPosition:r.position},crossorigin:r.crossorigin,referrerpolicy:r.referrerpolicy};return r.lazyLoad?m(f("img",S({ref:y},o),null),[[w("lazy"),r.src]]):f("img",S({ref:y,src:r.src,onLoad:x,onError:P},o),null)},E=({el:r})=>{const o=()=>{r===y.value&&h.value&&I()};y.value?o():g(o)},k=({el:r})=>{r!==y.value||i.value||P()};return p&&u&&(p.$on("loaded",E),p.$on("error",k),d((()=>{p.$off("loaded",E),p.$off("error",k)}))),v((()=>{g((()=>{var o;(null==(o=y.value)?void 0:o.complete)&&!r.lazyLoad&&I()}))})),()=>{var o;return f("div",{class:L({round:r.round,block:r.block}),style:z.value},[j(),h.value&&r.showLoading?f("div",{class:L("loading")},[$(r.loadingIcon,L("loading-icon"),e.loading)]):i.value&&r.showError?f("div",{class:L("error")},[$(r.errorIcon,L("error-icon"),e.error)]):void 0,null==(o=e.default)?void 0:o.call(e)])}}});r("I",z(I))}}}));