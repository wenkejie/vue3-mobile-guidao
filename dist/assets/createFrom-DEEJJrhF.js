import{d as K,r as t,k as l,h as c,e as w,C as f,p as u,D as g,g as v,f as q,E as P,o as s,F,m as C,z as V,G as x,H as I,j as Q,J as W,I as X}from"./index-CIq-oMdo.js";import{C as Y}from"./index-H4v7lFx6.js";import"./index-gofcAkLv.js";import{F as Z}from"./index-CfBzFnno.js";import{F as ee}from"./index-BLH94utM.js";import{L as ne}from"./index-s7_3JXei.js";import"./use-scope-id-sANgzUDS.js";import"./use-id-BlRh9Qoc.js";const te={class:"form-create-wrap"},se={class:"wrap"},oe={class:"content-wrap"},ae={class:"q-wrap"},le=["onClick"],ie={class:"drap-area"},ce={key:0,class:"icon-radio"},re=["onUpdate:modelValue"],ue={key:0,class:"q-radio"},de={key:0,class:"icon-radio"},pe=["onFocus"],qe=K({__name:"createFrom",setup(_e){const b=t(!1);t(!1);const T=t(!1);t([{value:"单选题",text:"单选题"},{value:"多选题",text:"多选题"},{value:"文本题",text:"文本题"}]);const N=t(["cn","en","kr","jp","fr","de","ru","sp","po","it","nl","id","tr","thai","zh","fa","ro","ar"]),S=t(["中文","英语","韩语","日语","法语","德语","俄语","西班牙语","葡萄牙语","意大利语","荷兰语","印度语","土耳其语","泰语","繁体中文","波斯语","罗马尼亚语","阿拉伯语"]);t("英语"),t("中文");const U=t(["中文"]);t(!1),t("单选题");const h=t("添加选项");t([0,1]),t([5,10]),t([]);const i=t({display_name:"",name:[{questionnaire_name:"",desc:"",language:"cn"}],repeat_submit:!1,question:[{question_id:1,types:"单选题",is_required:!1,content:[{language:"cn",title:"",answer:[{answer_id:1,description:"选项1"}],line_answer:{line_value:1,line_end_value:5,line_tag:"",line_end_tag:""},text_answer:""}]}]});t(!0);const r=t(0);t(!1);function B(){b.value=!1}function D({relatedContext:e,draggedContext:n}){const o=e.index,a=n.index;e.element.question_id=a+1,n.element.question_id=o+1}function R(e){const n=e.target.classList;n.contains("add-list")||n.contains("el-icon-plus")||(r.value="title")}function $(e,n){const o=e.target.classList;o.contains("el-icon-delete")||o.contains("icon-copy")||r.value===n||(r.value=n)}function z(e,n){const o=i.value.question[e].content[n].answer;j(o)}function E(e,n,o){i.value.question[e].content[n].answer.splice(o,1)}function j(e){const n=e.length?Number.parseInt(e[e.length-1].description.substr(2))+1:1,o="选项".concat(n);e.push({answer_id:e.length+1,description:o}),W(()=>{const a=document.querySelectorAll(".radio-input");a[a.length-1].focus()})}function G(){const n=U.value.map(a=>N.value[S.value.indexOf(a)]).map(a=>({language:a,title:"",answer:[{answer_id:1,description:"选项1"}],line_answer:{line_value:1,line_end_value:5,line_tag:"",line_end_tag:""},text_answer:""})),o={question_id:i.value.question.length+1,types:"单选题",is_required:!1,content:n};i.value.question.push(o),r.value=i.value.question.length-1}function J(e){console.log("submit",JSON.stringify(i.value))}return(e,n)=>{const o=ne,a=X,M=Z,O=Y,A=P("draggable"),H=ee;return s(),l("div",te,[c(T)?(s(),w(o,{key:0,type:"spinner"})):f("",!0),u("div",se,[u("div",oe,[u("div",{class:g(["item title",{"title-focus":c(r)==="title"}]),onClick:R},[c(i).question[0].length?f("",!0):(s(),l("div",{key:0,class:"add-list",onClick:G},[v(a,{name:"plus"})]))],2),u("div",ae,[v(H,{onSubmit:J},{default:q(()=>[(s(!0),l(F,null,C(c(i).question,(d,p)=>(s(),w(A,{key:p,list:c(i).question,move:D,onStart:n[1]||(n[1]=_=>b.value=!0),onEnd:B},{default:q(()=>[u("div",{class:g(["q-li",{"q-li-focus":c(r)===p}]),onClick:_=>$(_,p)},[u("div",ie,[v(a,{name:"drag"})]),(s(!0),l(F,null,C(d.content,(_,y)=>(s(),l("div",{key:y},[v(O,{inset:""},{default:q(()=>[v(M,{modelValue:_.title,"onUpdate:modelValue":m=>_.title=m,class:"form-cell-group",label:"问题：","label-width":"auto",center:"",clearable:"",placeholder:"请输入问题",onFocus:e.autoText,onInput:e.autoText},null,8,["modelValue","onUpdate:modelValue","onFocus","onInput"]),(s(!0),l(F,null,C(_.answer,(m,k)=>(s(),l("div",{key:k,class:"q-radio"},[["下拉列表","优先级"].includes(d.types)?(s(),l("div",ce,V(k+1)+".",1)):(s(),l("div",{key:1,class:g(["icon-radio",{"icon-cirle":d.types==="单选题","icon-square":d.types==="多选题"}])},null,2)),x(u("input",{"onUpdate:modelValue":L=>m.description=L,class:"radio-input"},null,8,re),[[I,m.description]]),c(r)===p?(s(),w(a,{key:2,name:"cross",onClick:L=>E(p,y,k)},null,8,["onClick"])):f("",!0)]))),128)),c(r)===p?(s(),l("div",ue,[["下拉列表","优先级"].includes(d.types)?(s(),l("div",de,V(_.answer.length+1)+".",1)):(s(),l("div",{key:1,class:g(["icon-radio",{"icon-cirle":d.types==="单选题","icon-square":d.types==="多选题"}])},null,2)),x(u("input",{"onUpdate:modelValue":n[0]||(n[0]=m=>Q(h)?h.value=m:null),class:"radio-add",onFocus:m=>z(p,y)},null,40,pe),[[I,c(h)]])])):f("",!0)]),_:2},1024)]))),128))],10,le)]),_:2},1032,["list"]))),128))]),_:1})])])])])}}});export{qe as default};