System.register(["./Container.vue_vue_type_script_setup_true_lang-legacy-CP01r5C2.js","./index-legacy-9OZgdCRp.js","./index-legacy-DEYxqE2n.js","./index-legacy-BPvvYG6b.js","./index-legacy-Dbc7p3sP.js","./index-legacy-BgMNFsiw.js","./index-legacy-BW2JTngw.js","./index-legacy-ad9KPgzi.js","./index-legacy-DxspYRJU.js","./index-legacy-Df6O_RHV.js","./index-legacy-D2macRrG.js","./index-legacy-BxvE3bsm.js","./index-legacy-5fz56Dyj.js","./use-scope-id-legacy-CIAYnXz1.js","./index-legacy-BAGLBGCn.js","./use-id-legacy-Bsk_U-rn.js"],(function(e,l){"use strict";var a,n,t,i,o,u,s,d,c,r,m,p,h,f,v,g,y,x,w,b,_,V,j,k,U;return{setters:[e=>{a=e._},e=>{n=e.d,t=e.r,i=e.a,o=e.e,u=e.f,s=e.K,d=e.o,c=e.p,r=e.g,m=e.v,p=e.h,h=e.j},e=>{f=e.f,v=e.T},null,e=>{g=e.C},e=>{y=e.C},e=>{x=e.S},null,e=>{w=e.F},e=>{b=e.g,_=e.a,V=e.G},e=>{j=e.B},e=>{k=e.F},e=>{U=e.P},null,null,null],execute:function(){const l={class:"mt-20 text-right"},C=["src"],$=c("h3",{class:"text-center"},"下发设置",-1),E=c("span",null,"秒",-1),P={class:"m-15"};e("default",n({__name:"detail",setup(e){const n=s(),I=t(0),N=t([]),T=t([]);t([]),i(),t({src:"https://m.baidu.com/"});const D=t({}),F=t(!1),S=t(!1);t(!0),t(""),t(""),t([]),t(0);const q=t(""),z=t(!1);function A(){z.value=!0}function B(e){console.log("submit",e)}const G=e=>`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`;function L(e){const[l,a]=e;F.value=!1,D.value.dateTime=`${G(l)} ~ ${G(a)}`}async function Q(e){I.value=e;const l=T.value[e];if(!l.children){const e=await async function(e){return new Promise((l=>{setTimeout((()=>{V({DepartmentId:e,Skip:1,PageSize:50}).then((e=>{let a=e.data.list;const n=[];a.forEach((e=>{n.push({text:e.firstName,id:Number(e.userName)})})),console.log(n,"userArr"),l(n)}))}),1e3)}))}(l.id);l.children=e}}function K(e){const l=[...N.value],a=l.indexOf(Number(e.id));return-1==a?(l.push(e.id),!1):(l.splice(a,1),console.log(N.value,"activeIds.value"),!1)}return function(){const e=n.query.id,l=n.query.name;_(e).then((a=>{const n=a.result,t=`http://172.20.153.9:5001/api/document/${e}/officeviewer?token=${n}&isVersion=false&fullfilename=${l}`,i=(new TextEncoder).encode(t),o=f(i);q.value=`http://172.20.153.9:8012/onlinePreview?url=${o}`}))}(),b({parentId:"13"}).then((e=>{e.forEach((e=>{T.value.push({text:e.fullName,id:e.id})}))})),(e,n)=>{const t=j,i=w,s=x,f=y,b=k,_=U,V=g,G=v,M=a;return d(),o(M,null,{default:u((()=>[c("div",l,[r(t,{type:"primary",class:"important-mr-10",size:"small",onClick:A},{default:u((()=>[m("下发")])),_:1}),r(t,{type:"warning",size:"small",to:"/file/createFrom"},{default:u((()=>[m("答题")])),_:1})]),c("iframe",{ref:"iframe",src:p(q),class:"mt-10",width:"100%",height:"500px",frameborder:"0",allowfullscreen:""},null,8,C),r(_,{show:p(z),"onUpdate:show":n[8]||(n[8]=e=>h(z)?z.value=e:null),position:"bottom",title:"下发设置",style:{width:"100%",height:"90%"}},{default:u((()=>[$,r(b,{onSubmit:B},{default:u((()=>[r(f,{inset:""},{default:u((()=>[r(i,{modelValue:p(D).dateTime,"onUpdate:modelValue":n[0]||(n[0]=e=>p(D).dateTime=e),"is-link":"",readonly:"",name:"datePicker",label:"时间选择",placeholder:"点击选择时间",onClick:n[1]||(n[1]=e=>F.value=!0)},null,8,["modelValue"]),r(i,{modelValue:p(N),"onUpdate:modelValue":n[2]||(n[2]=e=>h(N)?N.value=e:null),"is-link":"",readonly:"",name:"persons",label:"人员选择",placeholder:"点击下发人员",onClick:n[3]||(n[3]=e=>{S.value=!0})},null,8,["modelValue"]),r(i,{modelValue:p(D).browseDuration,"onUpdate:modelValue":n[4]||(n[4]=e=>p(D).browseDuration=e),name:"传阅时长",label:"传阅时长",placeholder:"传阅时长"},{"right-icon":u((()=>[E])),_:1},8,["modelValue"]),r(i,{name:"switch1",label:"到期推送","label-width":"150px"},{input:u((()=>[r(s,{modelValue:p(D).isExpirePush,"onUpdate:modelValue":n[5]||(n[5]=e=>p(D).isExpirePush=e)},null,8,["modelValue"])])),_:1}),r(i,{name:"switch2",label:"到期后不可查阅","label-width":"150px"},{input:u((()=>[r(s,{modelValue:p(D).isExpireUnableLook,"onUpdate:modelValue":n[6]||(n[6]=e=>p(D).isExpireUnableLook=e)},null,8,["modelValue"])])),_:1}),r(i,{name:"switch2",label:"是否答题","label-width":"150px"},{input:u((()=>[r(s,{modelValue:p(D).ishasQues,"onUpdate:modelValue":n[7]||(n[7]=e=>p(D).ishasQues=e)},null,8,["modelValue"])])),_:1})])),_:1}),c("div",P,[r(t,{round:"",block:"",type:"primary","native-type":"submit"},{default:u((()=>[m(" 提交 ")])),_:1})])])),_:1})])),_:1},8,["show"]),r(V,{show:p(F),"onUpdate:show":n[9]||(n[9]=e=>h(F)?F.value=e:null),type:"range",onConfirm:L},null,8,["show"]),r(_,{show:p(S),"onUpdate:show":n[12]||(n[12]=e=>h(S)?S.value=e:null),position:"bottom"},{default:u((()=>[r(G,{"active-id":p(N),"onUpdate:activeId":n[10]||(n[10]=e=>h(N)?N.value=e:null),"main-active-index":p(I),"onUpdate:mainActiveIndex":n[11]||(n[11]=e=>h(I)?I.value=e:null),items:p(T),onClickNav:Q,onClickItem:K},null,8,["active-id","main-active-index","items"])])),_:1},8,["show"])])),_:1})}}}))}}}));
