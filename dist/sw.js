if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>l(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-e1498109"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/_...all_-legacy-DHthjuf7.js",revision:null},{url:"assets/_...all_-xcIqwMpr.js",revision:null},{url:"assets/_plugin-vue_export-helper-DlAUqK2U.js",revision:null},{url:"assets/_plugin-vue_export-helper-legacy-DgAO6S8O.js",revision:null},{url:"assets/circulateDetail-0mNK7PDh.js",revision:null},{url:"assets/circulateDetail-legacy-C0NLje87.js",revision:null},{url:"assets/circulateList-DTZjnTgk.js",revision:null},{url:"assets/circulateList-legacy-Cgv4OM4j.js",revision:null},{url:"assets/Container.vue_vue_type_script_setup_true_lang-992KGQIc.js",revision:null},{url:"assets/Container.vue_vue_type_script_setup_true_lang-legacy-CCSBcsrI.js",revision:null},{url:"assets/createFrom-CfR43kn3.js",revision:null},{url:"assets/createFrom-CoqJBiqp.js",revision:null},{url:"assets/createFrom-legacy-_1zeqlBx.js",revision:null},{url:"assets/createFrom-legacy-DaNn7Wkx.js",revision:null},{url:"assets/detail-B6aS2Eru.js",revision:null},{url:"assets/detail-IcVbM6DW.js",revision:null},{url:"assets/detail-legacy-Cb_VxmvD.js",revision:null},{url:"assets/detail-legacy-j-cQ57gz.js",revision:null},{url:"assets/detail2-B4M7L9Bp.js",revision:null},{url:"assets/detail2-legacy-BDDXwGti.js",revision:null},{url:"assets/index-5cPi2g9z.js",revision:null},{url:"assets/index-B-Ff8Pz7.js",revision:null},{url:"assets/index-B8di9SJd.js",revision:null},{url:"assets/index-B8hp4XFx.js",revision:null},{url:"assets/index-BAvUovDX.js",revision:null},{url:"assets/index-BcWqLaTX.js",revision:null},{url:"assets/index-BE-teCPM.js",revision:null},{url:"assets/index-BhdpNd2d.js",revision:null},{url:"assets/index-BPX4y2K6.js",revision:null},{url:"assets/index-Brl9UrGa.js",revision:null},{url:"assets/index-BuJUjHPB.js",revision:null},{url:"assets/index-C4CADt03.js",revision:null},{url:"assets/index-CcBkExma.js",revision:null},{url:"assets/index-Cgwce6nx.js",revision:null},{url:"assets/index-CiHtLCfQ.js",revision:null},{url:"assets/index-CILr6CzX.js",revision:null},{url:"assets/index-Ck5v8vsJ.js",revision:null},{url:"assets/index-CsNCc2Jz.js",revision:null},{url:"assets/index-D-0M1gZj.js",revision:null},{url:"assets/index-DAV6N3XB.js",revision:null},{url:"assets/index-DG-rwu-t.js",revision:null},{url:"assets/index-DvD0r5QM.js",revision:null},{url:"assets/index-DwjRI5iC.js",revision:null},{url:"assets/index-DWk3zZ_Q.js",revision:null},{url:"assets/index-DX93Q2Im.js",revision:null},{url:"assets/index-legacy-32Wf88gh.js",revision:null},{url:"assets/index-legacy-9X1R4FpT.js",revision:null},{url:"assets/index-legacy-B1OZR7xd.js",revision:null},{url:"assets/index-legacy-B3Av6Txk.js",revision:null},{url:"assets/index-legacy-B48rtywN.js",revision:null},{url:"assets/index-legacy-B4cqeJ0R.js",revision:null},{url:"assets/index-legacy-BdHsrvsv.js",revision:null},{url:"assets/index-legacy-Be2elz4V.js",revision:null},{url:"assets/index-legacy-Bj9-vsqe.js",revision:null},{url:"assets/index-legacy-BJy13u9f.js",revision:null},{url:"assets/index-legacy-BkR0gpOT.js",revision:null},{url:"assets/index-legacy-BW_hwWv8.js",revision:null},{url:"assets/index-legacy-C4uaeX_5.js",revision:null},{url:"assets/index-legacy-C7g6TEdz.js",revision:null},{url:"assets/index-legacy-CB30VlzH.js",revision:null},{url:"assets/index-legacy-CvCbhfJ-.js",revision:null},{url:"assets/index-legacy-DD0ZAtKG.js",revision:null},{url:"assets/index-legacy-DDVGGqY8.js",revision:null},{url:"assets/index-legacy-Dnejgqwc.js",revision:null},{url:"assets/index-legacy-DnIR_4mY.js",revision:null},{url:"assets/index-legacy-DQN7DwWB.js",revision:null},{url:"assets/index-legacy-DYOp3raF.js",revision:null},{url:"assets/index-legacy-DzBV2vxH.js",revision:null},{url:"assets/index-legacy-gP0RaK7N.js",revision:null},{url:"assets/index-legacy-H9rRkiZC.js",revision:null},{url:"assets/index-legacy-LTeDfY1I.js",revision:null},{url:"assets/index-legacy-Oq1oBIPj.js",revision:null},{url:"assets/index-legacy-WWapM3dH.js",revision:null},{url:"assets/index-legacy-yqi55t_a.js",revision:null},{url:"assets/index-legacy-Z9QECwG6.js",revision:null},{url:"assets/index-q98G61ae.js",revision:null},{url:"assets/index-Ti0Ywde6.js",revision:null},{url:"assets/index-uhWDaAQm.js",revision:null},{url:"assets/index-uKI1M4X-.js",revision:null},{url:"assets/index-umkg9oYo.js",revision:null},{url:"assets/mount-component-DagK2MhE.js",revision:null},{url:"assets/mount-component-legacy-BsY0kdnd.js",revision:null},{url:"assets/polyfills-legacy-DYot8dph.js",revision:null},{url:"assets/style-DdMgDrc8.css",revision:null},{url:"assets/use-id-DLJohKva.js",revision:null},{url:"assets/use-id-legacy-C-0XbuH5.js",revision:null},{url:"index.html",revision:"6cfab0a0d81343e8a27b4ea14978cf13"},{url:"registerSW.js",revision:"3dcf965b4e64784711c6205871ed277c"},{url:"favicon.svg",revision:"f7b8fe9d9e55ab94d33dc6b8247b7013"},{url:"safari-pinned-tab.svg",revision:"5e185cd60cbcb8b4cb6eb87f8ad6163f"},{url:"pwa-192x192.png",revision:"e8ae0acadea484e802558bc66b8eb61c"},{url:"pwa-512x512.png",revision:"78d09dec566526d7c5f4636e6291379c"},{url:"manifest.webmanifest",revision:"e93d1e77fcc00f81e4b7a729ed90e72d"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
