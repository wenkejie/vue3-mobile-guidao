import{L as f,d as h,O as k,g as l,U as b,al as t,M as w,a0 as S}from"./index-CIq-oMdo.js";import{L as y}from"./index-s7_3JXei.js";const[L,c]=f("switch"),z={size:b,loading:Boolean,disabled:Boolean,modelValue:t,activeColor:String,inactiveColor:String,activeValue:{type:t,default:!0},inactiveValue:{type:t,default:!1}};var P=h({name:L,props:z,emits:["change","update:modelValue"],setup(e,{emit:d,slots:n}){const o=()=>e.modelValue===e.activeValue,u=()=>{if(!e.disabled&&!e.loading){const a=o()?e.inactiveValue:e.activeValue;d("update:modelValue",a),d("change",a)}},r=()=>{if(e.loading){const a=o()?e.activeColor:e.inactiveColor;return l(y,{class:c("loading"),color:a},null)}if(n.node)return n.node()};return k(()=>e.modelValue),()=>{var a;const{size:v,loading:m,disabled:s,activeColor:g,inactiveColor:V}=e,i=o(),C={fontSize:w(v),backgroundColor:i?g:V};return l("div",{role:"switch",class:c({on:i,loading:m,disabled:s}),style:C,tabindex:s?void 0:0,"aria-checked":i,onClick:u},[l("div",{class:c("node")},[r()]),(a=n.background)==null?void 0:a.call(n)])}}});const N=S(P);export{N as S};
