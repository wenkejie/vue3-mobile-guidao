import{K as y,ai as L,aE as D,d as I,aF as V,g as n,a0 as B,T as o,S as _,aj as u,V as s,I as b,$ as q}from"./index-Ti0Ywde6.js";const[z,i]=y("cell"),A={tag:B("div"),icon:String,size:String,title:o,value:o,label:o,center:Boolean,isLink:Boolean,border:_,iconPrefix:String,valueClass:u,labelClass:u,titleClass:u,titleStyle:null,arrowDirection:String,required:{type:[Boolean,String],default:null},clickable:{type:Boolean,default:null}},N=L({},A,D);var R=I({name:z,props:N,setup(e,{slots:a}){const v=V(),g=()=>{if(a.label||s(e.label))return n("div",{class:[i("label"),e.labelClass]},[a.label?a.label():e.label])},h=()=>{var l;if(a.title||s(e.title)){const t=(l=a.title)==null?void 0:l.call(a);return Array.isArray(t)&&t.length===0?void 0:n("div",{class:[i("title"),e.titleClass],style:e.titleStyle},[t||n("span",null,[e.title]),g()])}},m=()=>{const l=a.value||a.default;if(l||s(e.value))return n("div",{class:[i("value"),e.valueClass]},[l?l():n("span",null,[e.value])])},S=()=>{if(a.icon)return a.icon();if(e.icon)return n(b,{name:e.icon,class:i("left-icon"),classPrefix:e.iconPrefix},null)},w=()=>{if(a["right-icon"])return a["right-icon"]();if(e.isLink){const l=e.arrowDirection&&e.arrowDirection!=="right"?"arrow-".concat(e.arrowDirection):"arrow";return n(b,{name:l,class:i("right-icon")},null)}};return()=>{var l;const{tag:t,size:r,center:C,border:P,isLink:k,required:x}=e,c=(l=e.clickable)!=null?l:k,d={center:C,required:!!x,clickable:c,borderless:!P};return r&&(d[r]=!!r),n(t,{class:i(d),role:c?"button":void 0,tabindex:c?0:void 0,onClick:v},{default:()=>{var f;return[S(),h(),m(),w(),(f=a.extra)==null?void 0:f.call(a)]}})}}});const $=q(R);export{$ as C,A as c};
