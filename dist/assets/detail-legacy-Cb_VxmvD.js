System.register(["./Container.vue_vue_type_script_setup_true_lang-legacy-CCSBcsrI.js","./index-legacy-C7g6TEdz.js","./index-legacy-LTeDfY1I.js","./index-legacy-CvCbhfJ-.js","./index-legacy-Dnejgqwc.js","./index-legacy-B3Av6Txk.js","./index-legacy-yqi55t_a.js","./index-legacy-DYOp3raF.js","./index-legacy-9X1R4FpT.js","./index-legacy-BdHsrvsv.js","./index-legacy-DQN7DwWB.js","./index-legacy-gP0RaK7N.js","./index-legacy-BW_hwWv8.js","./index-legacy-BJy13u9f.js","./_plugin-vue_export-helper-legacy-DgAO6S8O.js","./index-legacy-B4cqeJ0R.js","./mount-component-legacy-BsY0kdnd.js","./use-id-legacy-C-0XbuH5.js"],(function(e,l){"use strict";var a,t,n,u,i,s,o,d,c,r,v,m,p,f,y,h,g,w,_,b,x,k,I,j,C,D,q,U,V,$,A,S,Q,F,E,P,T,z,M;return{setters:[e=>{a=e._},e=>{t=e.d,n=e.r,u=e.c,i=e.aA,s=e.q,o=e.ag,d=e.e,c=e.f,r=e.aB,v=e.o,m=e.g,p=e.v,f=e.C,y=e.p,h=e.k,g=e.m,w=e.F,_=e.aC,b=e.A,x=e.B},e=>{k=e.T},null,e=>{I=e.C},e=>{j=e.C},null,e=>{C=e.F},e=>{D=e.f,q=e.S,U=e.a},e=>{V=e.a,$=e.b,A=e.u,S=e.s,Q=e.c,F=e.G},e=>{E=e.B},e=>{P=e.F},e=>{T=e.P},e=>{z=e.P},e=>{M=e._},null,null,null],execute:function(){const l=e=>(b("data-v-6a3c46fc"),e=e(),x(),e),N={class:"iframe-grid mt-10"},B=["src"],G={key:1,class:"mt-20 text-right"},L=l((()=>y("h3",{class:"text-center"},"下发设置",-1))),O={class:"m-15"},H=l((()=>y("h3",{class:"text-center"},"请根据文件内容答题",-1))),Y={class:"m-15"};e("default",M(t({__name:"detail",setup(e){const l=n(0),t=n([]),b=n([]);n({src:"https://m.baidu.com/"});const x=r(),M=n({}),J=n(!1),K=n(!1),R=n(!1),W=n(!1),X=n(""),Z=n(!1),ee=n(null),le=n({circulationDocId:"",userAnswers:[]}),ae=n(1),te=n(!1),ne=n({circulationDocId:"",studyDuration:0}),ue=n(0),ie=n([]),se=n([]),oe=n([]),de=n(0),ce=n([]),re=n(0),ve=n(0),me=n(null);function pe(e){Ie(2),A(le.value).then((e=>{200===e.statusCode?(S({type:"success",message:"提交成功"}),Ie(2),_.go(-1)):(S({type:"danger",message:e.msg}),ae.value=1)}))}u((()=>Math.round(ve.value)));const fe=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`;function ye(e){const[l,a]=e;J.value=!1,M.value.dateTime=`${fe(l)} ~ ${fe(a)}`}async function he(e){l.value=e;const a=b.value[e];if(!a.children){const e=await async function(e){return F({DepartmentId:e,Skip:1,PageSize:50}).then((e=>e.map((e=>({text:e.firstName,id:Number(e.userName)})))))}(a.id);a.children=e}}function ge(e){const l=[...t.value],a=l.indexOf(e.id);-1===a?l.push(e.id):l.splice(a,1),t.value=l,M.value.persons=l}function we(){null===me.value&&(re.value=Date.now(),me.value=window.setInterval(be,1e3))}function _e(){null!==me.value&&(clearInterval(me.value),me.value=null,be())}function be(){const e=Date.now();ve.value+=Math.floor((e-re.value)/1e3),re.value=e}function xe(){"hidden"===document.visibilityState?_e():"visible"===document.visibilityState&&we()}function ke({selectedOptions:e}){ce.value[de.value]=e.map((e=>e.description)).join("/"),le.value.userAnswers[de.value].answerId=e[0]?.id,Z.value=!1}function Ie(e){ne.value.studyDuration=Math.round(ve.value),Q(ne.value).then((l=>{200===l.statusCode?ae.value=e:(S({type:"danger",message:l.msg}),ae.value=0)}))}function je(){_e(),ve.value>5?(Ie(2),W.value=!0):(S({type:"warning",message:`学习时间不足${ue.value/1e3}秒`}),we())}i((()=>{ee.value=x.query.isFinished})),s((()=>{we(),function(){const e=x.query.documentId,l=x.query.name;$(e).then((a=>{const t=a.result,n=`http://172.20.153.9:5001/api/document/${e}/officeviewer?token=${t}&isVersion=false&fullfilename=${l}`,u=(new TextEncoder).encode(n),i=D(u);X.value=`http://172.20.153.9:8012/onlinePreview?url=${i}`}))}(),V({id:x.query.id}).then((e=>{le.value.circulationDocId=e.data.id,ne.value.circulationDocId=e.data.id,te.value=e.data.isHasQuestion,ue.value=1e3*e.data.browseDuration,e.data.circulationQuestions.forEach((e=>{se.value.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,options:e.circulationQuestionAnswers}),le.value.userAnswers.push({questionId:e.circulationQuestionAnswers[0].circulationQuestionId,answerId:""}),ie.value.push(e.title)}))})),document.addEventListener("visibilitychange",xe)})),o((()=>{_e(),document.removeEventListener("visibilitychange",xe)}));const Ce={text:"description",value:"id"};return(e,n)=>{const u=q,i=U,s=E,o=C,r=j,_=P,x=T,D=z,V=I,$=k,A=a;return v(),d(A,null,{default:c((()=>["false"==ee.value?(v(),d(i,{key:0,active:e.active,class:"mt10"},{default:c((()=>[m(u,null,{default:c((()=>[p("查看")])),_:1}),te.value?(v(),d(u,{key:0},{default:c((()=>[p("答题")])),_:1})):f("",!0),m(u,null,{default:c((()=>[p("确认")])),_:1})])),_:1},8,["active"])):f("",!0),y("div",N,[y("iframe",{ref:"iframe",src:X.value,width:"100%",height:"500px",frameborder:"0",allowfullscreen:""},null,8,B)]),"false"==ee.value?(v(),h("div",G,[te.value&&1===ae.value?(v(),d(s,{key:0,type:"primary",size:"small",block:"",onClick:je},{default:c((()=>[p("答题")])),_:1})):(v(),d(s,{key:1,type:"primary",size:"small",block:"",onClick:n[0]||(n[0]=e=>Ie(2))},{default:c((()=>[p("确认")])),_:1}))])):f("",!0),m(x,{show:R.value,"onUpdate:show":n[5]||(n[5]=e=>R.value=e),position:"bottom",title:"下发设置",style:{width:"100%",height:"80%"}},{default:c((()=>[L,m(_,{onSubmit:pe},{default:c((()=>[m(r,{inset:""},{default:c((()=>[m(o,{modelValue:M.value.dateTime,"onUpdate:modelValue":n[1]||(n[1]=e=>M.value.dateTime=e),"is-link":"",readonly:"",name:"datePicker",label:"时间选择",placeholder:"点击选择时间",onClick:n[2]||(n[2]=e=>J.value=!0)},null,8,["modelValue"]),m(o,{modelValue:t.value,"onUpdate:modelValue":n[3]||(n[3]=e=>t.value=e),"is-link":"",readonly:"",name:"persons",label:"人员选择",placeholder:"点击下发人员",onClick:n[4]||(n[4]=e=>K.value=!0)},null,8,["modelValue"])])),_:1}),y("div",O,[m(s,{round:"",block:"",type:"primary","native-type":"submit"},{default:c((()=>[p("提交")])),_:1})])])),_:1})])),_:1},8,["show"]),m(x,{show:W.value,"onUpdate:show":n[6]||(n[6]=e=>W.value=e),position:"bottom",title:"答题",style:{width:"100%",height:"80%"}},{default:c((()=>[H,m(_,{onSubmit:pe},{default:c((()=>[m(r,{inset:""},{default:c((()=>[(v(!0),h(w,null,g(le.value.userAnswers,((e,l)=>(v(),d(o,{placeholder:"请选择答案",key:e.questionId,modelValue:ce.value[l],"onUpdate:modelValue":e=>ce.value[l]=e,disabled:"",label:`${ie.value[l]}:`,"label-width":"160px","label-align":"right",onClick:a=>function(e,l){oe.value=se.value.find((l=>l.questionId===e)).options,de.value=l,Z.value=!0}(e.questionId,l)},null,8,["modelValue","onUpdate:modelValue","label","onClick"])))),128))])),_:1}),y("div",Y,[m(s,{round:"",block:"",type:"primary","native-type":"submit"},{default:c((()=>[p("提交")])),_:1})])])),_:1})])),_:1},8,["show"]),m(x,{show:Z.value,"onUpdate:show":n[8]||(n[8]=e=>Z.value=e),position:"bottom"},{default:c((()=>[m(D,{columns:oe.value,"columns-field-names":Ce,onConfirm:ke,onCancel:n[7]||(n[7]=()=>Z.value=!1)},null,8,["columns"])])),_:1},8,["show"]),m(V,{show:J.value,"onUpdate:show":n[9]||(n[9]=e=>J.value=e),type:"range",onConfirm:ye},null,8,["show"]),m(x,{show:K.value,"onUpdate:show":n[12]||(n[12]=e=>K.value=e),position:"bottom"},{default:c((()=>[m($,{"active-id":t.value,"onUpdate:activeId":n[10]||(n[10]=e=>t.value=e),"main-active-index":l.value,"onUpdate:mainActiveIndex":n[11]||(n[11]=e=>l.value=e),items:b.value,onClickNav:he,onClickItem:ge},null,8,["active-id","main-active-index","items"])])),_:1},8,["show"])])),_:1})}}}),[["__scopeId","data-v-6a3c46fc"]]))}}}));
