System.register(["./index-legacy-C7g6TEdz.js"],(function(t,e){"use strict";var r,a,n,s,u,l,o,i,c,g,f,p;return{setters:[t=>{r=t.K,a=t.d,n=t.a3,s=t.c,u=t.g,l=t.a0,o=t.S,i=t.ah,c=t.ai,g=t.R,f=t.T,p=t.$}],execute:function(){const[e,h]=r("row"),v=Symbol(e),d={tag:l("div"),wrap:o,align:String,gutter:{type:[String,Number,Array],default:0},justify:String};var m=a({name:e,props:d,setup(t,{slots:e}){const{children:r,linkChildren:a}=n(v),l=s((()=>{const t=[[]];let e=0;return r.forEach(((r,a)=>{e+=Number(r.span),e>24?(t.push([a]),e-=24):t[t.length-1].push(a)})),t}));return a({spaces:s((()=>{let e=0;e=Array.isArray(t.gutter)?Number(t.gutter[0])||0:Number(t.gutter);const r=[];return e?(l.value.forEach((t=>{const a=e*(t.length-1)/t.length;t.forEach(((t,n)=>{if(0===n)r.push({right:a});else{const n=e-r[t-1].right,s=a-n;r.push({left:n,right:s})}}))})),r):r})),verticalSpaces:s((()=>{const{gutter:e}=t,r=[];if(Array.isArray(e)&&e.length>1){const t=Number(e[1])||0;if(t<=0)return r;l.value.forEach(((e,a)=>{a!==l.value.length-1&&e.forEach((()=>{r.push({bottom:t})}))}))}return r}))}),()=>{const{tag:r,wrap:a,align:n,justify:s}=t;return u(r,{class:h({[`align-${n}`]:n,[`justify-${s}`]:s,nowrap:!a})},{default:()=>{var t;return[null==(t=e.default)?void 0:t.call(e)]}})}}});const[y,b]=r("col"),S={tag:l("div"),span:g(0),offset:f};var $=a({name:y,props:S,setup(t,{slots:e}){const{parent:r,index:a}=i(v),n=s((()=>{if(!r)return;const{spaces:t,verticalSpaces:e}=r;let n={};if(t&&t.value&&t.value[a.value]){const{left:e,right:r}=t.value[a.value];n={paddingLeft:e?`${e}px`:null,paddingRight:r?`${r}px`:null}}const{bottom:s}=e.value[a.value]||{};return c(n,{marginBottom:s?`${s}px`:null})}));return()=>{const{tag:r,span:a,offset:s}=t;return u(r,{style:n.value,class:b({[a]:a,[`offset-${s}`]:s})},{default:()=>{var t;return[null==(t=e.default)?void 0:t.call(e)]}})}}});t("C",p($)),t("R",p(m))}}}));