System.register(["./Container.vue_vue_type_script_setup_true_lang-legacy-CP01r5C2.js","./index-legacy-9OZgdCRp.js","./index-legacy-DEYxqE2n.js","./index-legacy-BPvvYG6b.js","./index-legacy-Dbc7p3sP.js","./index-legacy-BgMNFsiw.js","./index-legacy-ad9KPgzi.js","./index-legacy-DxspYRJU.js","./index-legacy-BuM3H_7c.js","./index-legacy-Df6O_RHV.js","./index-legacy-D2macRrG.js","./index-legacy-BxvE3bsm.js","./index-legacy-5fz56Dyj.js","./index-legacy-DrKUOxFh.js","./use-scope-id-legacy-CIAYnXz1.js","./index-legacy-BAGLBGCn.js","./use-id-legacy-Bsk_U-rn.js"],(function(e,l){"use strict";var t,n,a,u,o,i,s,c,d,r,v,m,p,f,y,h,g,w,x,_,b,k,D,I,j,C,V,A,U,$,T,q,F;return{setters:[e=>{t=e._},e=>{n=e.d,a=e.r,u=e.a,o=e.e,i=e.f,s=e.K,c=e.o,d=e.g,r=e.v,v=e.h,m=e.C,p=e.p,f=e.j,y=e.k,h=e.m,g=e.F},e=>{w=e.f,x=e.T},null,e=>{_=e.C},e=>{b=e.C},null,e=>{k=e.F},e=>{D=e.S,I=e.a},e=>{j=e.a,C=e.c,V=e.s,A=e.d,U=e.G},e=>{$=e.B},e=>{T=e.F},e=>{q=e.P},e=>{F=e.P},null,null,null],execute:function(){const l=["src"],Q={class:"mt-20 text-right"},P=p("h3",{class:"text-center"},"下发设置",-1),S={class:"m-15"},E=p("h3",{class:"text-center"},"请根据文件内容答题",-1),N={class:"m-15"};e("default",n({__name:"detail2",setup(e){const n=a(0),M=a([]),z=a([]);a([]),u(),a({src:"https://m.baidu.com/"});const B=s(),G=a({}),H=a(!1),O=a(!1);a(!0),a(""),a(""),a([]),a(0);const K=a(0),R=a(!1),Y=a(!1),J=a("");function L(e){console.log("submit",le.value)}const W=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`;function X(e){const[l,t]=e;H.value=!1,G.value.dateTime=`${W(l)} ~ ${W(t)}`}async function Z(e){n.value=e;const l=z.value[e];if(!l.children){const e=await async function(e){return new Promise((l=>{setTimeout((()=>{U({DepartmentId:e,Skip:1,PageSize:50}).then((e=>{const t=[];e.forEach((e=>{t.push({text:e.firstName,id:Number(e.userName)})})),console.log(t,"userArr"),l(t)}))}),1e3)}))}(l.id);l.children=e}}function ee(e){const l=[...M.value],t=l.indexOf(Number(e.id));return-1==t?(l.push(e.id),!1):(l.splice(t,1),console.log(M.value,"activeIds.value"),!1)}const le=a({circulationDocId:"",userAnswers:[]}),te=a(1),ne=a(!1),ae=a({circulationDocId:"",studyDuration:0}),ue=a([]),oe=a([]),ie=a([]),se=a(0),ce=a([]),de=a(!1);function re(e,l){se.value=l,de.value=!0,ie.value=function(e){const l=oe.value.find((l=>l.questionId===e));return l?l.options:[]}(e)}const ve=a(0);function me(){ve.value||(ve.value=Date.now(),console.log(ae.value.studyDuration,"startTime"))}function pe(){if(ve.value){const e=(Date.now()-ve.value)/1e3;ae.value.studyDuration+=e,ve.value=0,console.log(ae.value.studyDuration,"endTime")}}function fe({selectedOptions:e}){ce.value[se.value]=e[0]?.description,le.value.userAnswers[se.value].answerId=e[0]?.id,de.value=!1}const ye={text:"description",value:"id"};function he(){le.value={circulationDocId:"",userAnswers:[]},ae.value={circulationDocId:"",studyDuration:0},K.value=0,ue.value=[],oe.value=[],proxy.resetForm("formRef"),handelQuery()}function ge(){ae.value.studyDuration>K.value?(we(2),Y.value=!0):V({type:"danger",message:`学习时间不足${K.value}秒`})}function we(e){ae.value.studyDuration=1e3*Math.round(ae.value.studyDuration),A(ae.value).then((l=>{200==l.statusCode?te.value=e:console.log(l.msg)}))}function xe(){1==te.value?(we(1),he(),openFileView.value=!1):updateCirculationDocAnswer(le.value).then((e=>{200==e.statusCode?(ElMessage({message:"提交成功",type:"success"}),he(),openFileView.value=!1):(ElMessage({message:e.msg,type:"error"}),te.value=1)}))}return function(){const e=B.query.id;C({id:e}).then((e=>{le.value.circulationDocId=e.data.id,ae.value.circulationDocId=e.data.id,ne.value=e.data.isHasQuestion,e.data.circulationQuestions.forEach((e=>{oe.value.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,options:e.circulationQuestionAnswers}),le.value.userAnswers.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,answerId:""}),ue.value.push(e.title)})),K.value=e.data.browseDuration}))}(),function(){const e=B.query.documentId,l=B.query.name;j(e).then((t=>{const n=t.result,a=`http://172.16.70.50:5001/api/document/${e}/officeviewer?token=${n}&isVersion=false&fullfilename=${l}`,u=(new TextEncoder).encode(a),o=w(u);J.value=`http://172.20.153.9:8012/onlinePreview?url=${o}`}))}(),(e,a)=>{const u=D,s=I,w=$,j=k,C=b,V=T,A=q,U=F,B=_,K=x,W=t;return c(),o(W,null,{default:i((()=>[d(s,{active:e.active,class:"mt10"},{default:i((()=>[d(u,null,{default:i((()=>[r("查看")])),_:1}),1==v(ne)?(c(),o(u,{key:0},{default:i((()=>[r("答题")])),_:1})):m("",!0),d(u,null,{default:i((()=>[r("确认")])),_:1})])),_:1},8,["active"]),p("div",{class:"iframe-grid mt-10",onTouchstart:me,onTouchend:pe},[p("iframe",{ref:"iframe",src:v(J),width:"100%",height:"500px",frameborder:"0",allowfullscreen:""},null,8,l)],32),p("div",Q,[1==v(ne)&&1==v(te)?(c(),o(w,{key:0,type:"primary",size:"small",block:"",onClick:ge},{default:i((()=>[r("答题")])),_:1})):(c(),o(w,{key:1,type:"primary",size:"small",block:"",onClick:xe},{default:i((()=>[r("确认")])),_:1}))]),d(A,{show:v(R),"onUpdate:show":a[4]||(a[4]=e=>f(R)?R.value=e:null),position:"bottom",title:"下发设置",style:{width:"100%",height:"80%"}},{default:i((()=>[P,d(V,{onSubmit:L},{default:i((()=>[d(C,{inset:""},{default:i((()=>[d(j,{modelValue:v(G).dateTime,"onUpdate:modelValue":a[0]||(a[0]=e=>v(G).dateTime=e),"is-link":"",readonly:"",name:"datePicker",label:"时间选择",placeholder:"点击选择时间",onClick:a[1]||(a[1]=e=>H.value=!0)},null,8,["modelValue"]),d(j,{modelValue:v(M),"onUpdate:modelValue":a[2]||(a[2]=e=>f(M)?M.value=e:null),"is-link":"",readonly:"",name:"persons",label:"人员选择",placeholder:"点击下发人员",onClick:a[3]||(a[3]=e=>{O.value=!0})},null,8,["modelValue"])])),_:1}),p("div",S,[d(w,{round:"",block:"",type:"primary","native-type":"submit"},{default:i((()=>[r(" 提交 ")])),_:1})])])),_:1})])),_:1},8,["show"]),d(A,{show:v(Y),"onUpdate:show":a[5]||(a[5]=e=>f(Y)?Y.value=e:null),position:"bottom",title:"答题",style:{width:"100%",height:"80%"}},{default:i((()=>[E,d(V,{onSubmit:L},{default:i((()=>[d(C,{inset:""},{default:i((()=>[(c(!0),y(g,null,h(v(le).userAnswers,((e,l)=>(c(),o(j,{key:e.questionId,modelValue:v(ce)[l],"onUpdate:modelValue":e=>v(ce)[l]=e,disabled:"true",label:`${v(ue)[l]}:`,"label-width":"120px","label-align":"right",onClick:t=>re(e.questionId,l)},null,8,["modelValue","onUpdate:modelValue","label","onClick"])))),128))])),_:1}),p("div",N,[d(w,{round:"",block:"",type:"primary","native-type":"submit"},{default:i((()=>[r(" 提交 ")])),_:1})])])),_:1})])),_:1},8,["show"]),d(A,{show:v(de),"onUpdate:show":a[7]||(a[7]=e=>f(de)?de.value=e:null),position:"bottom"},{default:i((()=>[d(U,{columns:v(ie),"columns-field-names":ye,onConfirm:fe,onCancel:a[6]||(a[6]=e=>de.value=!1)},null,8,["columns"])])),_:1},8,["show"]),d(B,{show:v(H),"onUpdate:show":a[8]||(a[8]=e=>f(H)?H.value=e:null),type:"range",onConfirm:X},null,8,["show"]),d(A,{show:v(O),"onUpdate:show":a[11]||(a[11]=e=>f(O)?O.value=e:null),position:"bottom"},{default:i((()=>[d(K,{"active-id":v(M),"onUpdate:activeId":a[9]||(a[9]=e=>f(M)?M.value=e:null),"main-active-index":v(n),"onUpdate:mainActiveIndex":a[10]||(a[10]=e=>f(n)?n.value=e:null),items:v(z),onClickNav:Z,onClickItem:ee},null,8,["active-id","main-active-index","items"])])),_:1},8,["show"])])),_:1})}}}))}}}));
