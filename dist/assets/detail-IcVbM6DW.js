import{_ as fe}from"./Container.vue_vue_type_script_setup_true_lang-992KGQIc.js";import{d as _e,r as o,c as he,aA as we,q as ye,ag as ge,e as d,f as s,aB as ke,o as i,g as l,v as u,C as L,p as m,k as ee,m as be,F as Ie,aC as Ce,A as De,B as Ae}from"./index-Ti0Ywde6.js";import{T as Te}from"./index-BPX4y2K6.js";import"./index-uhWDaAQm.js";import{C as Ue}from"./index-DwjRI5iC.js";import{C as Ve}from"./index-B8hp4XFx.js";import"./index-DAV6N3XB.js";import{F as $e}from"./index-B-Ff8Pz7.js";import{f as xe,S as Se,a as qe}from"./index-q98G61ae.js";import{a as Be,b as Fe,u as Ne,s as U,c as Qe,G as Pe}from"./index-Cgwce6nx.js";import{B as Me}from"./index-CsNCc2Jz.js";import{F as Ee}from"./index-BAvUovDX.js";import{P as Le}from"./index-DG-rwu-t.js";import{P as ze}from"./index-Brl9UrGa.js";import{_ as Ge}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-C4CADt03.js";import"./mount-component-DagK2MhE.js";import"./use-id-DLJohKva.js";const te=h=>(De("data-v-6a3c46fc"),h=h(),Ae(),h),Re={class:"iframe-grid mt-10"},je=["src"],He={key:1,class:"mt-20 text-right"},Oe=te(()=>m("h3",{class:"text-center"},"下发设置",-1)),Ye={class:"m-15"},Je=te(()=>m("h3",{class:"text-center"},"请根据文件内容答题",-1)),Ke={class:"m-15"},We=_e({__name:"detail",setup(h){const V=o(0),r=o([]),z=o([]);o({src:"https://m.baidu.com/"});const w=ke(),y=o({}),g=o(!1),$=o(!1),G=o(!1),x=o(!1),R=o(""),v=o(!1),S=o(null),p=o({circulationDocId:"",userAnswers:[]}),k=o(1),q=o(!1),B=o({circulationDocId:"",studyDuration:0}),j=o(0),H=o([]),O=o([]),Y=o([]),F=o(0),N=o([]),Q=o(0),b=o(0),f=o(null);he(()=>Math.round(b.value));function J(t){I(2),Ne(p.value).then(e=>{e.statusCode===200?(U({type:"success",message:"提交成功"}),I(2),Ce.go(-1)):(U({type:"danger",message:e.msg}),k.value=1)})}const K=t=>"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate());function oe(t){const[e,a]=t;g.value=!1,y.value.dateTime="".concat(K(e)," ~ ").concat(K(a))}async function ne(t){return Pe({DepartmentId:t,Skip:1,PageSize:50}).then(e=>e.map(a=>({text:a.firstName,id:Number(a.userName)})))}async function ae(t){V.value=t;const e=z.value[t];if(!e.children){const a=await ne(e.id);e.children=a}}function se(t){const e=[...r.value],a=e.indexOf(t.id);a===-1?e.push(t.id):e.splice(a,1),r.value=e,y.value.persons=e}function le(){const t=w.query.documentId,e=w.query.name;Fe(t).then(a=>{const E=a.result,D="".concat("http://172.20.153.9:5001/","api/document/").concat(t,"/officeviewer?token=").concat(E,"&isVersion=false&fullfilename=").concat(e),A=new TextEncoder().encode(D),c=xe(A);R.value="http://172.20.153.9:8012/onlinePreview?url=".concat(c)})}function P(){f.value===null&&(Q.value=Date.now(),f.value=window.setInterval(W,1e3))}function M(){f.value!==null&&(clearInterval(f.value),f.value=null,W())}function W(){const t=Date.now();b.value+=Math.floor((t-Q.value)/1e3),Q.value=t}function X(){document.visibilityState==="hidden"?M():document.visibilityState==="visible"&&P()}function ie({selectedOptions:t}){var e;N.value[F.value]=t.map(a=>a.description).join("/"),p.value.userAnswers[F.value].answerId=(e=t[0])==null?void 0:e.id,v.value=!1}function ue(t,e){Y.value=O.value.find(a=>a.questionId===t).options,F.value=e,v.value=!0}function I(t){B.value.studyDuration=Math.round(b.value),Qe(B.value).then(e=>{e.statusCode===200?k.value=t:(U({type:"danger",message:e.msg}),k.value=0)})}function re(){M(),b.value>5?(I(2),x.value=!0):(U({type:"warning",message:"学习时间不足".concat(j.value/1e3,"秒")}),P())}we(()=>{S.value=w.query.isFinished}),ye(()=>{P(),le(),Be({id:w.query.id}).then(t=>{p.value.circulationDocId=t.data.id,B.value.circulationDocId=t.data.id,q.value=t.data.isHasQuestion,j.value=t.data.browseDuration*1e3,t.data.circulationQuestions.forEach(e=>{O.value.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,options:e.circulationQuestionAnswers}),p.value.userAnswers.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,answerId:""}),H.value.push(e.title)})}),document.addEventListener("visibilitychange",X)}),ge(()=>{M(),document.removeEventListener("visibilitychange",X)});const ce={text:"description",value:"id"};return(t,e)=>{const a=Se,E=qe,_=Me,C=$e,D=Ve,A=Ee,c=Le,de=ze,me=Ue,ve=Te,pe=fe;return i(),d(pe,null,{default:s(()=>[S.value=="false"?(i(),d(E,{key:0,active:t.active,class:"mt10"},{default:s(()=>[l(a,null,{default:s(()=>[u("查看")]),_:1}),q.value?(i(),d(a,{key:0},{default:s(()=>[u("答题")]),_:1})):L("",!0),l(a,null,{default:s(()=>[u("确认")]),_:1})]),_:1},8,["active"])):L("",!0),m("div",Re,[m("iframe",{ref:"iframe",src:R.value,width:"100%",height:"500px",frameborder:"0",allowfullscreen:""},null,8,je)]),S.value=="false"?(i(),ee("div",He,[q.value&&k.value===1?(i(),d(_,{key:0,type:"primary",size:"small",block:"",onClick:re},{default:s(()=>[u("答题")]),_:1})):(i(),d(_,{key:1,type:"primary",size:"small",block:"",onClick:e[0]||(e[0]=n=>I(2))},{default:s(()=>[u("确认")]),_:1}))])):L("",!0),l(c,{show:G.value,"onUpdate:show":e[5]||(e[5]=n=>G.value=n),position:"bottom",title:"下发设置",style:{width:"100%",height:"80%"}},{default:s(()=>[Oe,l(A,{onSubmit:J},{default:s(()=>[l(D,{inset:""},{default:s(()=>[l(C,{modelValue:y.value.dateTime,"onUpdate:modelValue":e[1]||(e[1]=n=>y.value.dateTime=n),"is-link":"",readonly:"",name:"datePicker",label:"时间选择",placeholder:"点击选择时间",onClick:e[2]||(e[2]=n=>g.value=!0)},null,8,["modelValue"]),l(C,{modelValue:r.value,"onUpdate:modelValue":e[3]||(e[3]=n=>r.value=n),"is-link":"",readonly:"",name:"persons",label:"人员选择",placeholder:"点击下发人员",onClick:e[4]||(e[4]=n=>$.value=!0)},null,8,["modelValue"])]),_:1}),m("div",Ye,[l(_,{round:"",block:"",type:"primary","native-type":"submit"},{default:s(()=>[u("提交")]),_:1})])]),_:1})]),_:1},8,["show"]),l(c,{show:x.value,"onUpdate:show":e[6]||(e[6]=n=>x.value=n),position:"bottom",title:"答题",style:{width:"100%",height:"80%"}},{default:s(()=>[Je,l(A,{onSubmit:J},{default:s(()=>[l(D,{inset:""},{default:s(()=>[(i(!0),ee(Ie,null,be(p.value.userAnswers,(n,T)=>(i(),d(C,{placeholder:"请选择答案",key:n.questionId,modelValue:N.value[T],"onUpdate:modelValue":Z=>N.value[T]=Z,disabled:"",label:"".concat(H.value[T],":"),"label-width":"160px","label-align":"right",onClick:Z=>ue(n.questionId,T)},null,8,["modelValue","onUpdate:modelValue","label","onClick"]))),128))]),_:1}),m("div",Ke,[l(_,{round:"",block:"",type:"primary","native-type":"submit"},{default:s(()=>[u("提交")]),_:1})])]),_:1})]),_:1},8,["show"]),l(c,{show:v.value,"onUpdate:show":e[8]||(e[8]=n=>v.value=n),position:"bottom"},{default:s(()=>[l(de,{columns:Y.value,"columns-field-names":ce,onConfirm:ie,onCancel:e[7]||(e[7]=()=>v.value=!1)},null,8,["columns"])]),_:1},8,["show"]),l(me,{show:g.value,"onUpdate:show":e[9]||(e[9]=n=>g.value=n),type:"range",onConfirm:oe},null,8,["show"]),l(c,{show:$.value,"onUpdate:show":e[12]||(e[12]=n=>$.value=n),position:"bottom"},{default:s(()=>[l(ve,{"active-id":r.value,"onUpdate:activeId":e[10]||(e[10]=n=>r.value=n),"main-active-index":V.value,"onUpdate:mainActiveIndex":e[11]||(e[11]=n=>V.value=n),items:z.value,onClickNav:ae,onClickItem:se},null,8,["active-id","main-active-index","items"])]),_:1},8,["show"])]),_:1})}}}),_t=Ge(We,[["__scopeId","data-v-6a3c46fc"]]);export{_t as default};
