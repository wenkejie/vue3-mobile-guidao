System.register(["./index-legacy-C7g6TEdz.js"],(function(e,l){"use strict";var t,i,r,a,n,s,o,c,u,d,v,b,f;return{setters:[e=>{t=e.K,i=e.ai,r=e.aE,a=e.d,n=e.aF,s=e.g,o=e.a0,c=e.T,u=e.S,d=e.aj,v=e.V,b=e.I,f=e.$}],execute:function(){const[l,g]=t("cell"),y=e("c",{tag:o("div"),icon:String,size:String,title:c,value:c,label:c,center:Boolean,isLink:Boolean,border:u,iconPrefix:String,valueClass:d,labelClass:d,titleClass:d,titleStyle:null,arrowDirection:String,required:{type:[Boolean,String],default:null},clickable:{type:Boolean,default:null}}),S=i({},y,r);var C=a({name:l,props:S,setup(e,{slots:l}){const t=n(),i=()=>{if(l.label||v(e.label))return s("div",{class:[g("label"),e.labelClass]},[l.label?l.label():e.label])},r=()=>{var t;if(l.title||v(e.title)){const r=null==(t=l.title)?void 0:t.call(l);if(Array.isArray(r)&&0===r.length)return;return s("div",{class:[g("title"),e.titleClass],style:e.titleStyle},[r||s("span",null,[e.title]),i()])}},a=()=>{const t=l.value||l.default;if(t||v(e.value))return s("div",{class:[g("value"),e.valueClass]},[t?t():s("span",null,[e.value])])},o=()=>{if(l["right-icon"])return l["right-icon"]();if(e.isLink){const l=e.arrowDirection&&"right"!==e.arrowDirection?`arrow-${e.arrowDirection}`:"arrow";return s(b,{name:l,class:g("right-icon")},null)}};return()=>{var i;const{tag:n,size:c,center:u,border:d,isLink:v,required:f}=e,y=null!=(i=e.clickable)?i:v,S={center:u,required:!!f,clickable:y,borderless:!d};return c&&(S[c]=!!c),s(n,{class:g(S),role:y?"button":void 0,tabindex:y?0:void 0,onClick:t},{default:()=>{var t;return[l.icon?l.icon():e.icon?s(b,{name:e.icon,class:g("left-icon"),classPrefix:e.iconPrefix},null):void 0,r(),a(),o(),null==(t=l.extra)?void 0:t.call(l)]}})}}});e("C",f(C))}}}));
