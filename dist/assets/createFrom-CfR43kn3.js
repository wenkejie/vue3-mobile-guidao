import{d as X,r as n,k as a,h as i,e as y,C as m,p as _,D as k,E as F,G as C,g as f,f as g,H as Y,o,F as V,m as b,z as T,j as Z,J as ee,I as te}from"./index-Ti0Ywde6.js";import{C as ne}from"./index-B8hp4XFx.js";import"./index-DAV6N3XB.js";import{F as oe}from"./index-B-Ff8Pz7.js";import{D as se,a as ae}from"./index-CILr6CzX.js";import{F as le}from"./index-BAvUovDX.js";import{L as ie}from"./index-C4CADt03.js";import"./index-DG-rwu-t.js";import"./use-id-DLJohKva.js";const ce={class:"form-create-wrap"},re={class:"wrap"},ue={class:"content-wrap"},de={class:"li"},pe={class:"q-wrap"},_e=["onClick"],me={class:"drap-area"},ve={key:0,class:"q-item"},fe={key:0,class:"icon-radio"},ge=["onUpdate:modelValue"],ye={key:0,class:"q-radio"},ke={key:0,class:"icon-radio"},we=["onFocus"],he={key:1,class:"q-item text-wrap"},qe={key:2,class:"q-item option-wrap pt10"},Ne=X({__name:"createFrom",setup(Fe){const L=n(!1);n(!1);const U=n(!1),x=n([{value:"单选题",text:"单选题"},{value:"多选题",text:"多选题"},{value:"文本题",text:"文本题"}]),D=n(["cn","en","kr","jp","fr","de","ru","sp","po","it","nl","id","tr","thai","zh","fa","ro","ar"]),N=n(["中文","英语","韩语","日语","法语","德语","俄语","西班牙语","葡萄牙语","意大利语","荷兰语","印度语","土耳其语","泰语","繁体中文","波斯语","罗马尼亚语","阿拉伯语"]);n("英语"),n("中文");const S=n(["中文"]);n(!1),n("单选题");const w=n("添加选项");n([0,1]),n([5,10]),n([]);const c=n({display_name:"",name:[{questionnaire_name:"",desc:"",language:"cn"}],repeat_submit:!1,question:[{question_id:1,types:"单选题",is_required:!1,content:[{language:"cn",title:"",answer:[{answer_id:1,description:"选项1"}],line_answer:{line_value:1,line_end_value:5,line_tag:"",line_end_tag:""},text_answer:""}]}]});n(!0);const u=n(0);n(!1);function $(){L.value=!1}function B({relatedContext:e,draggedContext:t}){const l=e.index,r=t.index;e.element.question_id=r+1,t.element.question_id=l+1}function R(e){const t=e.target.classList;t.contains("add-list")||t.contains("el-icon-plus")||(u.value="title")}function z(e,t){const l=e.target.classList;l.contains("el-icon-delete")||l.contains("icon-copy")||u.value===t||(u.value=t)}function E(e,t){const l=c.value.question[e].content[t].answer;O(l)}function M(e,t,l){c.value.question[e].content[t].answer.splice(l,1)}function O(e){const t=e.length?Number.parseInt(e[e.length-1].description.substr(2))+1:1,l="选项".concat(t);e.push({answer_id:e.length+1,description:l}),ee(()=>{const r=document.querySelectorAll(".radio-input");r[r.length-1].focus()})}function j(){const t=S.value.map(r=>D.value[N.value.indexOf(r)]).map(r=>({language:r,title:"",answer:[{answer_id:1,description:"选项1"}],line_answer:{line_value:1,line_end_value:5,line_tag:"",line_end_tag:""},text_answer:""})),l={question_id:c.value.question.length+1,types:"单选题",is_required:!1,content:t};c.value.question.push(l),u.value=c.value.question.length-1}function G(e){c.value.question.splice(e,1),u.value=e===0&&c.value.question.length>0?e:e-1}function J(e){console.log("submit",JSON.stringify(c.value))}return(e,t)=>{const l=ie,r=te,A=se,H=ae,K=oe,P=ne,Q=Y("draggable"),W=le;return o(),a("div",ce,[i(U)?(o(),y(l,{key:0,type:"spinner"})):m("",!0),_("div",re,[_("div",ue,[_("div",{class:k(["item title",{"title-focus":i(u)==="title"}]),onClick:R},[_("div",de,[F(_("textarea",{"onUpdate:modelValue":t[0]||(t[0]=s=>i(c).display_name=s),class:"form-title",placeholder:"表单标题",onFocus:t[1]||(t[1]=(...s)=>e.autoText&&e.autoText(...s)),onInput:t[2]||(t[2]=(...s)=>e.autoText&&e.autoText(...s))},null,544),[[C,i(c).display_name]])]),i(c).question[0].length?m("",!0):(o(),a("div",{key:0,class:"add-list",onClick:j},[f(r,{name:"plus"})]))],2),_("div",pe,[f(W,{onSubmit:J},{default:g(()=>[(o(!0),a(V,null,b(i(c).question,(s,d)=>(o(),y(Q,{key:d,list:i(c).question,move:B,onStart:t[4]||(t[4]=v=>L.value=!0),onEnd:$},{default:g(()=>[_("div",{class:k(["q-li",{"q-li-focus":i(u)===d}]),onClick:v=>z(v,d)},[_("div",me,[f(r,{name:"drag"})]),(o(!0),a(V,null,b(s.content,(v,h)=>(o(),a("div",{key:h},[f(P,{inset:""},{default:g(()=>[f(K,{modelValue:v.title,"onUpdate:modelValue":p=>v.title=p,class:"form-cell-group",label:"问题：","label-width":"auto",center:"",clearable:"",placeholder:"请输入问题",onFocus:e.autoText,onInput:e.autoText},{button:g(()=>[i(u)===d?(o(),y(H,{key:0},{default:g(()=>[f(A,{modelValue:s.types,"onUpdate:modelValue":p=>s.types=p,options:i(x)},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1024)):m("",!0)]),_:2},1032,["modelValue","onUpdate:modelValue","onFocus","onInput"]),["下拉列表","单选题","多选题"].includes(s.types)?(o(),a("div",ve,[(o(!0),a(V,null,b(v.answer,(p,q)=>(o(),a("div",{key:q,class:"q-radio"},[["下拉列表","优先级"].includes(s.types)?(o(),a("div",fe,T(q+1)+".",1)):(o(),a("div",{key:1,class:k(["icon-radio",{"icon-cirle":s.types==="单选题","icon-square":s.types==="多选题"}])},null,2)),F(_("input",{"onUpdate:modelValue":I=>p.description=I,class:"radio-input"},null,8,ge),[[C,p.description]]),i(u)===d?(o(),y(r,{key:2,name:"cross",onClick:I=>M(d,h,q)},null,8,["onClick"])):m("",!0)]))),128)),i(u)===d?(o(),a("div",ye,[["下拉列表","优先级"].includes(s.types)?(o(),a("div",ke,T(v.answer.length+1)+".",1)):(o(),a("div",{key:1,class:k(["icon-radio",{"icon-cirle":s.types==="单选题","icon-square":s.types==="多选题"}])},null,2)),F(_("input",{"onUpdate:modelValue":t[3]||(t[3]=p=>Z(w)?w.value=p:null),class:"radio-add",onFocus:p=>E(d,h)},null,40,we),[[C,i(w)]])])):m("",!0)])):m("",!0),s.types==="文本题"?(o(),a("div",he,"文本回答")):m("",!0),i(u)===d?(o(),a("div",qe,[f(r,{name:"delete",onClick:p=>G(d)},null,8,["onClick"])])):m("",!0)]),_:2},1024)]))),128))],10,_e)]),_:2},1032,["list"]))),128))]),_:1})])])])])}}});export{Ne as default};