(this["webpackJsonptimezone-converter"]=this["webpackJsonptimezone-converter"]||[]).push([[0],{198:function(e,n,t){},199:function(e,n,t){},256:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(22),c=t.n(r),o=(t(198),t(10)),s=t(12),l=(t(199),t(274)),u=t(271),d=t(148);t(257);d.a.initializeApp({apiKey:"AIzaSyDyBlYHayJJxJ_39xIk7j3swZt9V1BYxYE",authDomain:"family-gift-85cf0.firebaseapp.com",projectId:"family-gift-85cf0",storageBucket:"family-gift-85cf0.appspot.com",messagingSenderId:"254392565266",appId:"1:254392565266:web:1aec5e8f9249bf774462cb"});var f,h,j,b,p,m,g,x,O,w,y,v,S,z,k,D,A,C,L,E,U,P,F,T,Z,B,N,M,I,R,q,J,_,H,W,Y,Q,K,X,G=d.a,V=(t(100),t(13)),$=t(40),ee=t(42),ne=t(270),te=t(259),ae=t(3),ie=V.a.div(f||(f=Object(s.a)(["\n  width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n\n  a {\n    text-align: center;\n  }\n"]))),re=function(e){var n=e.setLoading,t=e.setUser,i=(e.gotoCreateAccountScreen,Object(ee.useToasts)().addToast),r=Object(a.useState)(""),c=Object(o.a)(r,2),s=c[0],l=c[1],u=Object(a.useState)(""),d=Object(o.a)(u,2),f=d[0],h=d[1];return Object(ae.jsxs)(ie,{children:[Object(ae.jsx)(ne.a,{id:"email",placeholder:"Email",onChange:function(e){l(e.target.value)}}),Object(ae.jsx)(ne.a,{id:"password",type:"password",placeholder:"Password",onChange:function(e){h(e.target.value)}}),Object(ae.jsx)("br",{}),Object(ae.jsx)(te.a,{onClick:function(){G.auth().setPersistence(G.auth.Auth.Persistence.LOCAL).then((function(){return n(!0),G.auth().signInWithEmailAndPassword(s,f).then((function(e){var a=e.user;G.firestore().collection("users").doc(e.user.uid).get().then((function(e){e.exists?(t(Object($.a)(Object($.a)({},a),e.data())),chrome.storage.sync.set({user:e.data()}),n(!1)):(n(!1),i("Extra user info doesn't exist",{appearance:"error"}))})).catch((function(e){i(e.message,{appearance:"error"})}))})).catch((function(e){i(e.message,{appearance:"error"}),n(!1)}))})).catch((function(e){i(e.message,{appearance:"error"}),n(!1)}))},children:"Login"}),Object(ae.jsx)("br",{})]})},ce=t(272),oe=t(179),se=t(174),le=t.n(se),ue=V.a.div(h||(h=Object(s.a)(["\n  width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n\n  button {\n    width: 100%;\n  }\n"]))),de=function(e){var n=e.setLoading,t=e.setUser,i=e.gotoLoginScreen,r=Object(ee.useToasts)().addToast,c=Object(a.useState)(""),s=Object(o.a)(c,2),l=s[0],u=s[1],d=Object(a.useState)(Intl.DateTimeFormat().resolvedOptions().timeZone),f=Object(o.a)(d,2),h=f[0],j=f[1],b=Object(a.useState)(""),p=Object(o.a)(b,2),m=p[0],g=p[1],x=Object(a.useState)(""),O=Object(o.a)(x,2),w=O[0],y=O[1],v=Object(a.useState)(""),S=Object(o.a)(v,2),z=S[0],k=S[1];return Object(ae.jsxs)(ue,{children:[Object(ae.jsx)("a",{onClick:function(){i()},children:"Back"}),Object(ae.jsx)("br",{}),Object(ae.jsxs)(ce.a,{autoComplete:"off",children:[Object(ae.jsx)(ce.a.Field,{children:Object(ae.jsx)(ne.a,{id:"email",placeholder:"Email",onChange:function(e){u(e.target.value)}})}),Object(ae.jsx)(ce.a.Field,{children:Object(ae.jsx)(ne.a,{id:"name",placeholder:"Name",onChange:function(e){k(e.target.value)}})}),Object(ae.jsx)(ce.a.Field,{children:Object(ae.jsx)(le.a,{placeholder:"Enter a city/suburb",apiKey:"AIzaSyAoo4AxObgyDTt93omLUjila-ircLZX5_s",onPlaceSelected:function(e){var n=e.address_components.find((function(e){return e.types.includes("country")})).short_name,t=e.address_components[0].long_name;g("".concat(t,", ").concat(n))}})}),Object(ae.jsx)(ce.a.Field,{children:Object(ae.jsx)(oe.a,{value:h,onChange:j})}),Object(ae.jsx)(ce.a.Field,{children:Object(ae.jsx)(ne.a,{id:"password",type:"password",placeholder:"Password",onChange:function(e){y(e.target.value)}})}),Object(ae.jsx)("br",{}),Object(ae.jsx)(te.a,{onClick:function(){G.auth().setPersistence(G.auth.Auth.Persistence.LOCAL).then((function(){return n(!0),G.auth().createUserWithEmailAndPassword(l,w).then((function(e){var a=e.user,i={timezone:h.value?h.value:h,name:z,email:l,location:m};G.firestore().collection("users").doc(e.user.uid).set(i).then((function(e){t(Object($.a)(Object($.a)({},a),i)),chrome.storage.sync.set({user:i}),n(!1),r("You have successfully created your account!",{appearance:"success"})})).catch((function(e){n(!1),r(e.message,{appearance:"error"})}))})).catch((function(e){r(e.message,{appearance:"error"}),n(!1)}))})).catch((function(e){r(e.message,{appearance:"error"}),n(!1)}))},children:"Create Acount"})]})]})},fe=function(e){var n=e.setUser,t=e.user,i=e.setLoading,r=e.children,c=Object(a.useState)("login"),s=Object(o.a)(c,2),l=s[0],u=s[1];return t?Object(ae.jsx)(ae.Fragment,{children:r}):Object(ae.jsx)(ae.Fragment,{children:"login"===l?Object(ae.jsx)(re,{setLoading:i,setUser:n,gotoCreateAccountScreen:function(){u("create-account")}}):"create-account"===l?Object(ae.jsx)(de,{setLoading:i,setUser:n,gotoLoginScreen:function(){u("login")}}):Object(ae.jsx)("div",{children:"Error occurred"})})},he=t(102),je=t(16),be=t.n(je),pe=t(26),me=t(273),ge=(t(258),t(127)),xe=t.n(ge),Oe=t(128),we=t.n(Oe),ye=t(150),ve=t.n(ye),Se=V.a.div(j||(j=Object(s.a)(["\n  opacity: 0;\n  transition: opacity 2s ease;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  background: white;\n  font-family: ProductSansRegular;\n  font-size: 16px;\n  color: #545454;\n  padding: 30px;\n  box-shadow: 0 0 12px -2px rgba(0,0,0,0.05);\n  flex: 1;\n\n  b {\n    font-family: ProductSansBold;\n  }\n"]))),ze=V.a.div(b||(b=Object(s.a)(["\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 10px;\n  gap: 20px;\n"]))),ke=V.a.div(p||(p=Object(s.a)(["\n  font-family: ProductSansBold;\n  font-size: 30px;\n"]))),De=V.a.div(m||(m=Object(s.a)(["\n  font-family: ProductSansBold;\n  font-size: 20px;\n"]))),Ae=V.a.img(g||(g=Object(s.a)(["\n\n"]))),Ce={0:["eating 2 eggs on a piece of bread."],1:["taking classes.","learning about the meaning of life!"],2:["eating yummy Mexican food!"],3:["playing card games with his roommate."],4:["eating Japanese for dinner."],5:["chilling with his friends.","at a party...","having the best time of his life.","listening to music in his room."],6:["in his dorm, having a deep & meaningful convo with his roommate."],7:["sleeping zzzz"]},Le={0:["staying inside his dorm to avoid the thunder strikes!"],1:["listening to the rain drops and thinking about life back home :)"],2:["enjoying each drop of rain that hits the floor."],3:["in awe of the snow."],4:["weirded out by this strange, uncanny weather."],5:["outside with his friends, kicking a football or something.","outside going fountain hopping with his friends!"],6:["going on a walk with a new friend, hearing their story."],7:["sad that he can't see the sun because of how cloudy it is :("]},Ee=function(e){var n=e.user,t=Object(a.useState)(null),i=Object(o.a)(t,2),r=i[0],c=i[1],s=Object(a.useState)(null),l=Object(o.a)(s,2),u=l[0],d=l[1],f=Object(a.useState)(!1),h=Object(o.a)(f,2),j=h[0],b=h[1],p=Object(a.useState)(null),m=Object(o.a)(p,2),g=m[0],x=m[1],O=Object(a.useState)(null),w=Object(o.a)(O,2),y=w[0],v=w[1],S=Object(a.useState)(null),z=Object(o.a)(S,2),k=z[0],D=z[1],A=Object(a.useState)(null),C=Object(o.a)(A,2),L=C[0],E=C[1],U=function(e){var t=(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone}),a=ve()(t);return console.log(a(e)),a(e)};return Object(a.useEffect)((function(){var e=function(){var e=Object(pe.a)(be.a.mark((function e(){var t,a;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,we.a.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(n.location,"&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric"));case 2:t=e.sent,i=t.data.weather[0].id,v(a=i>=200&&i<300?0:i>=300&&i<400?1:i>=500&&i<600?2:i>=600&&i<700?3:i>=700&&i<800?4:800==i?5:i>800&&i<=802?6:i>=803&&i<=804?7:void 0),E(U(Le[a].length)),c({main:t.data.main,weather:t.data.weather});case 7:case"end":return e.stop()}var i}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(pe.a)(be.a.mark((function e(){return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G.firestore().collection("highlights").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get();case 2:e.sent.forEach((function(e){return d(e.data().highlight)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();setTimeout((function(){b(!0)}),100),t(),e()}),[]),Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsx)(Se,{className:j?"fade-in":"",children:Object(ae.jsxs)("p",{children:["In ",Object(ae.jsx)("b",{children:n.location.split(",")[0]}),", it's currently ",Object(ae.jsx)("b",{children:Object(ae.jsx)(xe.a,{onChange:function(e){var t=new Date(e).toLocaleTimeString("en-US",{timeZone:n.timezone}),a=function(e){if("AM"===e[3]){if(e[0]>=12&&e[0]<1)return 6;if(e[0]>=1&&e[0]<8)return 7;if(e[0]>=8&&e[0]<9)return 0;if(e[0]>=9&&e[0]<12)return 1}else{if(e[0]>=12&&e[0]<2)return 2;if(e[0]>=2&&e[0]<5)return 3;if(e[0]>=5&&e[0]<7)return 4;if(e[0]>=7&&e[0]<12)return 5}}([parseInt(t.split(":")[0]),parseInt(t.split(":")[1]),parseInt(t.split(":")[2].split(" ")[0]),t.split(" ")[1]]);D(function(e,t){var a=(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone});return ve()(a+e)(t)}(a,Ce[a].length)),x(a)},format:"h:mm A",ticking:!0,timezone:n.timezone})}),". ","Mum & Dad"!==n.name?Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsx)("b",{children:n.name})," is currently ",g?Ce[g][k]:null]}):null]})}),Object(ae.jsx)(Se,{className:r?"fade-in":"",children:r?Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsxs)(ze,{children:[Object(ae.jsxs)(ke,{children:[Math.round(r.main.temp),"\xb0"]}),Object(ae.jsx)(De,{children:r.weather[0].main}),Object(ae.jsx)(Ae,{src:"http://openweathermap.org/img/wn/".concat(r.weather[0].icon,"@2x.png"),width:"50px",height:"50px"})]}),Object(ae.jsxs)("p",{style:{fontSize:"12px"},children:["Today\u2019s weather at ",Object(ae.jsx)("b",{children:n.location.split(",")[0]})," is ",Object(ae.jsx)("b",{children:r.weather[0].description}),". ","Mum & Dad"!==n.name?Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsx)("b",{children:n.name})," is probably ",y?Le[y][L]:null]}):null]})]}):null}),u?Object(ae.jsx)(Se,{className:u?"fade-in":"",children:Object(ae.jsxs)("p",{children:[Object(ae.jsxs)("b",{children:[n.name,"'s"]})," main focus today is: ",Object(ae.jsx)("br",{}),u]})}):null]})},Ue=t(175),Pe=t.p+"static/media/top-overlay.870bedca.png",Fe=t(91),Te=(t(255),V.a.div(x||(x=Object(s.a)(["\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  border-radius: 6px;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  background: white;\n  font-family: ProductSansRegular;\n  font-size: 18px;\n  color: #545454;\n  padding: 30px;\n  box-shadow: 0 0 12px -2px rgba(0,0,0,0.05);\n  flex: 1;\n\n  b {\n    font-family: ProductSansBold;\n  }\n"])))),Ze=Object(V.a)(Ue.a)(O||(O=Object(s.a)(["\n  background-repeat: no-repeat center center fixed;\n  background-position: center;\n  background-size: cover;\n"]))),Be=V.a.div(w||(w=Object(s.a)(["\n  animation: fade-in-scale-down 0.2s ease-out 1;\n  -webkit-animation: fade-in-scale-down 0.4s ease-in-out 1;\n  -moz-animation:    fade-in-scale-down 0.4s ease-in-out 1;\n  -o-animation:      fade-in-scale-down 0.4s ease-in-out 1;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n\n  @keyframes fade-in-scale-down{\n    0%{\n      opacity:0;\n      -webkit-transform:scale(1.1);\n      -ms-transform:scale(1.1);\n      transform:scale(1.1)\n    }\n    \n    100%{\n      opacity:1;\n      -webkit-transform:scale(1);\n      -ms-transform:scale(1);\n      transform:scale(1);\n    }\n  }\n\n  .fade-in {\n    opacity: 1;\n    transition: opacity 1s ease;\n  }\n\n  .animate-in {\n    animation: fade-in-scale-down 0.2s ease-out 1;\n  }\n\n  .ui.disabled.input, .ui.form .disabled.field, .ui.form .disabled.fields .field, .ui.form .field :disabled {\n    opacity: 1 !important;\n    font-family: ProductSansBold !important;\n    border: none !important;\n  }\n"]))),Ne=V.a.div(y||(y=Object(s.a)(["\n  flex: 1.2;\n  transition: flex 0.5s ease;\n  position: relative;\n\n  &:hover {\n    flex: 1.8;\n    transition: flex 0.5s ease;\n  }\n\n  // & > div > div {\n  //   background-color: #262626 !important;\n  // }\n\n  // & > div > div:before {\n  //   background-image: linear-gradient(\n  //     100deg,\n  //     rgba(255, 255, 255, 0),\n  //     rgba(255, 255, 255, 0) 50%,\n  //     rgba(255, 255, 255, 0) 80%\n  //   );\n  // }\n"]))),Me=V.a.div(v||(v=Object(s.a)(["\n  transition: flex 0.5s ease;\n  flex: ",";\n  display: flex;\n  background: white;\n  padding: 10px 150px;\n  align-items: center;\n  justify-content: space-between;\n  color: #545454;\n"])),(function(e){return e.expand?"0.8":"0.4"})),Ie=V.a.div(S||(S=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 23px;\n  flex: 1;\n  margin-bottom: 40px;\n  transition: margin-bottom 0.5s ease;\n\n  &:hover {\n    margin-bottom: 0px;\n    transition: margin-bottom 0.5s ease;\n  }\n\n  &:hover svg {\n    opacity: 0.3;\n  }\n"]))),Re=V.a.div(z||(z=Object(s.a)(["\n  font-family: ProductSansRegular;\n  font-size: 30px;\n"]))),qe=V.a.div(k||(k=Object(s.a)(["\n  font-family: ProductSansBold;\n  font-size: 40px;\n"]))),Je=V.a.div(D||(D=Object(s.a)(["\n  display: flex;\n  align-items: center;\n  flex: 1;\n  justify-content: flex-end;\n  opacity: 0;\n"]))),_e=V.a.div(A||(A=Object(s.a)(["\n  font-family: ProductSansBold;\n  font-size: 45px;\n  flex-direction: row;\n  gap: 10px;\n"]))),He=V.a.img(C||(C=Object(s.a)(["\n\n"]))),We=V.a.div(L||(L=Object(s.a)(["\n  flex-direction: column;\n  display: flex;\n  text-align: center;\n  padding: 0 15px;\n"]))),Ye=V.a.div(E||(E=Object(s.a)(["\n  font-family: ProductSansRegular;\n  font-size:17px;\n"]))),Qe=V.a.div(U||(U=Object(s.a)(["\n  font-family: ProductSansBold;\n  font-size: 17px;\n"]))),Ke=V.a.div(P||(P=Object(s.a)(["\n  display: flex;\n  gap: 30px;\n  height: 100%;\n  width: 100%;\n"]))),Xe=V.a.div(F||(F=Object(s.a)(["\n  background: #F4F4F4;\n  overflow: hidden;\n  flex: ",";\n  padding: ",";\n  background: #F4F4F4;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.5s ease;\n  gap: 20px;\n  align-items: center;\n\n  &:hover > .reminder-icon, &:hover > .musing-icon {\n    opacity: ",";\n  }\n"])),(function(e){return e.expand?"0.5":"0"}),(function(e){return e.expand?"25px 150px":"0 150px"}),(function(e){return"normal"===e.cardState?"0.3":"0"})),Ge=V.a.div(T||(T=Object(s.a)(["\n  font-family: ProductSansRegular;\n  display: flex;\n  gap: 10px;\n\n  svg {\n    cursor: pointer;\n    opacity: 0;\n    color: black;\n    transition: opacity 0.5s ease;\n  }\n\n  svg:hover {\n    opacity: 0.7;\n    transition: opacity 0.5s ease;\n  }\n  \n"]))),Ve=V.a.div(Z||(Z=Object(s.a)(["\n  display: flex;\n  justify-content: center;\n  height: 100%;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  flex: 1;\n"]))),$e=V.a.img(B||(B=Object(s.a)(["\n  width: 100%;\n  z-index: 100;\n  position: absolute;\n  top: 0;\n  left: 0; \n  height: 300px;\n"]))),en=V.a.img(N||(N=Object(s.a)(["\n  transform: scaleY(-1);\n  width: 100%;\n  z-index: 100;\n  position: absolute;\n  bottom: 0;\n  height: 400px;\n"]))),nn=V.a.div(M||(M=Object(s.a)(["\n  color: white;\n  font-family: ProductSansRegular;\n  font-size: 15px;\n  position: absolute;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  bottom: 15px;\n  z-index: 1000;\n"]))),tn=V.a.div(I||(I=Object(s.a)(["\n  color: white;\n  font-family: ProductSansRegular;\n  font-size: 12px;\n  text-align: center;\n  position: absolute;\n  background: rgba(0,0,0,0.2);\n  border-radius: 15px;\n  padding: 12px;\n  right: 15px;\n  top: 15px;\n  z-index: 1000;\n  width: 20%;\n"]))),an=V.a.div(R||(R=Object(s.a)(["\n  color: white;\n  font-family: ProductSansRegular;\n  font-size: 12px;\n  text-align: center;\n  position: absolute;\n  background: rgba(0,0,0,0.2);\n  border-radius: 15px;\n  padding: 12px;\n  left: 15px;\n  top: 15px;\n  z-index: 1000;\n  width: 20%;\n"]))),rn=Object(V.a)(ne.a)(q||(q=Object(s.a)(["\n  width: 60%;\n  margin-top: 10px;\n\n  input, input:active, input:focus {\n    font-family: ProductSansRegular !important;\n    font-size: 20px;\n    border-left: none !important;\n    border-right: none !important;\n    border-top: none !important;\n    border-bottom: 1.5px solid rgba(0,0,0,0.15) !important;\n    text-align: center !important;\n    background: rgba(0,0,0,0) !important;\n    color: rgba(0,0,0,0.3) !important;\n    border-radius: 0 !important;\n    padding: 2px !important;\n  }\n  input::selection {\n    background: black;\n    color: white;\n    border-bottom: 1px solid white;\n  }\n\n  input::placeholder {\n    color: rgba(255, 255, 255, 0.3) !important;\n    opacity: 1;\n  }\n"]))),cn=Object(V.a)(ne.a)(J||(J=Object(s.a)(["\n  width: 30%;\n\n  input, input:active, input:focus {\n    font-family: ProductSansRegular !important;\n    font-size: 20px;\n    border: none !important;\n    text-align: center !important;\n    background: rgba(0,0,0,0) !important;\n    color: white !important;\n    border-radius: 0 !important;\n  }\n  input::selection {\n    background: white;\n    color: black;\n    border-bottom: 1px solid white;\n  }\n\n  input::placeholder {\n    color: rgba(255, 255, 255, 0.3) !important;\n    opacity: 1;\n  }\n"]))),on=V.a.div(_||(_=Object(s.a)(["\n  position: absolute;\n  color: white;\n  top: 15px;\n  font-size: 15px;\n  font-family: ProductSansRegular;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  flex-direction: column;\n"]))),sn=V.a.div(H||(H=Object(s.a)(["\n  opacity: 0;\n  text-transform: uppercase;\n  font-family: ProductSansBold;\n  font-size: 10px;\n  text-align: center;\n  margin-top: -4px;\n  color: rgba(255, 255, 255, 0.8);\n  transition: opacity 1s ease;\n  cursor: ",";\n"])),(function(e){return e.pointerCursor?"pointer":"normal"})),ln=(V.a.div(W||(W=Object(s.a)(["\n  font-family: ProductSansBold;\n  color: rgba(0,0,0,0.3);\n  font-size: 20px;\n"]))),Object(V.a)(Fe.b)(Y||(Y=Object(s.a)(["\n  position: absolute;\n  left: 110px;\n  opacity: 0;\n  transition: all 1s ease;\n  cursor: pointer;\n\n  &:hover {\n    opacity: 0.5 !important;\n  }\n"])))),un=Object(V.a)(Fe.c)(Q||(Q=Object(s.a)(["\n  position: absolute;\n  right: 110px;\n  opacity: 0;\n  transition: all 1s ease;\n  cursor: pointer;\n\n  &:hover {\n    opacity: 0.5 !important;\n  }\n"]))),dn=Object(V.a)(Fe.a)(K||(K=Object(s.a)(["\n  opacity: 0.3;\n  transition: all 1s ease;  \n  position: absolute;\n  top: 10px;\n  left: 10px;\n  cursor: pointer;\n\n  &:hover {\n    opacity: 0.5;\n  }\n"]))),fn=function(e){var n=e.user,t=e.setUser,i=Object(ee.useToasts)().addToast,r=Object(a.useState)(null),c=Object(o.a)(r,2),s=c[0],l=c[1],u=Object(a.useState)(""),d=Object(o.a)(u,2),f=d[0],h=d[1],j=Object(a.useState)(!1),b=Object(o.a)(j,2),p=b[0],m=b[1],g=Object(a.useState)(""),x=Object(o.a)(g,2),O=x[0],w=x[1],y=Object(a.useState)(""),v=Object(o.a)(y,2),S=v[0],z=v[1],k=Object(a.useState)(!1),D=Object(o.a)(k,2),A=D[0],C=D[1],L=Object(a.useState)([]),E=Object(o.a)(L,2),U=E[0],P=E[1],F=Object(a.useState)(null),T=Object(o.a)(F,2),Z=(T[0],T[1],Object(a.useState)(!1)),B=Object(o.a)(Z,2),N=(B[0],B[1]),M=Object(a.useState)(""),I=Object(o.a)(M,2),R=I[0],q=I[1],J=Object(a.useState)(!1),_=Object(o.a)(J,2),H=_[0],W=_[1],Y=Object(a.useState)(!1),Q=Object(o.a)(Y,2),K=Q[0],X=Q[1],V=Object(a.useState)("normal"),ie=Object(o.a)(V,2),re=ie[0],oe=ie[1],se=Object(a.useState)(!1),le=Object(o.a)(se,2),ue=le[0],de=le[1],fe=Object(a.useState)(""),je=Object(o.a)(fe,2),ge=je[0],Oe=je[1],ye=Object(a.useState)(""),ve=Object(o.a)(ye,2),Se=ve[0],ze=ve[1],ke=Object(a.useState)(!1),De=Object(o.a)(ke,2),Ae=De[0],Ce=De[1],Le=Object(a.useState)(),Ue=Object(o.a)(Le,2),fn=Ue[0],hn=Ue[1],jn=Object(a.useState)(),bn=Object(o.a)(jn,2),pn=bn[0],mn=bn[1],gn=Object(a.useState)([]),xn=Object(o.a)(gn,2),On=(xn[0],xn[1]),wn=Object(a.useState)([]),yn=Object(o.a)(wn,2),vn=yn[0],Sn=yn[1],zn=Object(a.useState)(!1),kn=Object(o.a)(zn,2),Dn=kn[0],An=kn[1],Cn=Object(a.useState)(!1),Ln=Object(o.a)(Cn,2),En=(Ln[0],Ln[1],Object(a.useRef)()),Un=Object(a.useRef)(),Pn=function(){var e=Object(pe.a)(be.a.mark((function e(n){var t,a;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,G.firestore().collection("musings").where("user","==",n.email).get();case 3:(a=e.sent).docs.length>0&&a.forEach((function(e){t.push(e.data())})),On(t);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Fn=function(){var e=Object(pe.a)(be.a.mark((function e(n){var t,a;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,G.firestore().collection("reminders").where("user","==",n.email).get();case 3:(a=e.sent).docs.length>0&&a.forEach((function(e){t.push(e.data())})),Sn(t);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Tn=function(){var e=Object(pe.a)(be.a.mark((function e(n){return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.length>1?("Dad"===n[0].name&&(Pn(n[0]),G.firestore().collection("musings").where("user","==",n[0].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[0].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){hn(["Dad",e.data().musing])}))}))),"Mum"===n[0].name&&(Fn(n[0]),G.firestore().collection("reminders").where("user","==",n[0].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[0].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){mn(["Mum",e.data().reminder])}))}))),"Dad"===n[1].name&&(Pn(n[1]),G.firestore().collection("musings").where("user","==",n[1].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[1].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){hn(["Dad",e.data().musing])}))}))),"Mum"===n[1].name&&(Fn(n[1]),G.firestore().collection("reminders").where("user","==",n[1].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[1].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){mn(["Mum",e.data().reminder])}))})))):(Pn(n[0]),G.firestore().collection("musings").where("user","==",n[0].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[0].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){hn([n[0].name,e.data().musing])}))})),Fn(n[0]),G.firestore().collection("reminders").where("user","==",n[0].email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n[0].timezone})).get().then((function(e){e.docs.length>0&&e.forEach((function(e){mn([n[0].name,e.data().reminder])}))})));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Zn=function(){var e=Object(pe.a)(be.a.mark((function e(){var t,a,i,r;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,G.firestore().collection("friends").where("mainUser","==",n.email).get();case 3:e.sent.forEach((function(e){t.push(e.data().otherUser)})),a=[],i=0;case 7:if(!(i<t.length)){e.next=15;break}return e.next=10,G.firestore().collection("users").where("email","==",t[i]).get();case 10:e.sent.forEach((function(e){return a.push(e.data())}));case 12:i++,e.next=7;break;case 15:Tn(a),r=a.map((function(e){return"Dad"===e.name||"Mum"===e.name?Object($.a)(Object($.a)({},e),{},{name:"Mum & Dad"}):e})),P(r);case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Bn=function(){var e=Object(pe.a)(be.a.mark((function e(){var t;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.next=3,G.firestore().collection("highlights").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get();case 3:e.sent.forEach((function(e){return t=e.data().highlight})),q(t),t&&W(!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Nn=function(){var e=Object(pe.a)(be.a.mark((function e(t){var a,r;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=null,e.next=3,G.firestore().collection("highlights").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get();case 3:e.sent.forEach((function(e){return a=e.id})),a?(r=G.firestore().collection("highlights").doc(a),G.firestore().runTransaction((function(e){return e.get(r).then((function(n){n.exists||i("Error, highlight does not exist",{appearance:"error"}),e.update(r,{highlight:t})}))})).then((function(){console.log("Transaction successfully committed!")})).catch((function(e){i(e.message,{appearance:"error"})}))):G.firestore().collection("highlights").add({user:n.email,date:(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone}),highlight:t});case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Mn=function(e){G.firestore().collection("quotes").add({quote:e,date:""}).then((function(){i("Quote added!",{appearance:"success"})})).catch((function(e){i(e.message,{appearance:"error"})}))},In=function(){var e=Object(pe.a)(be.a.mark((function e(t){var a,r;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=null,e.next=3,G.firestore().collection("musings").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get();case 3:e.sent.forEach((function(e){return a=e.id})),a?(r=G.firestore().collection("musings").doc(a),G.firestore().runTransaction((function(e){return e.get(r).then((function(n){n.exists||i("Error, reminder does not exist",{appearance:"error"}),e.update(r,{musing:t})}))})).then((function(){console.log("Transaction successfully committed!")})).catch((function(e){i(e.message,{appearance:"error"})}))):G.firestore().collection("musings").add({user:n.email,date:(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone}),musing:t});case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Rn=function(){var e=Object(pe.a)(be.a.mark((function e(t){var a,r;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=null,e.next=3,G.firestore().collection("reminders").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get();case 3:e.sent.forEach((function(e){return a=e.id})),a?(r=G.firestore().collection("reminders").doc(a),G.firestore().runTransaction((function(e){return e.get(r).then((function(n){n.exists||i("Error, reminder does not exist",{appearance:"error"}),e.update(r,{reminder:t})}))})).then((function(){console.log("Transaction successfully committed!")})).catch((function(e){i(e.message,{appearance:"error"})}))):G.firestore().collection("reminders").add({user:n.email,date:(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone}),reminder:t});case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){var e=function(){var e=Object(pe.a)(be.a.mark((function e(){var t;return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,we.a.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(n.location,"&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric"));case 2:t=e.sent,console.log(t.data),l({main:t.data.main,weather:t.data.weather});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();G.firestore().collection("quotes").where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get().then((function(e){e.size>0?e.forEach((function(e){h(e.data().quote)})):G.firestore().collection("quotes").where("date","==","").get().then((function(e){e.size>0&&e.forEach((function(e){h(e.data().quote);var t=G.firestore().collection("quotes").doc(e.id);G.firestore().runTransaction((function(e){return e.get(t).then((function(a){a.exists||i("Error, quote does not exist",{appearance:"error"}),e.update(t,{date:(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})})}))}))}))})).catch((function(e){i(e.message,{appearance:"error"})}))})),e(),Zn(),Bn(),G.firestore().collection("reminders").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get().then((function(e){e.size>0&&e.forEach((function(e){Oe(e.data().reminder),de(!0)}))})),G.firestore().collection("musings").where("user","==",n.email).where("date","==",(new Date).toLocaleDateString("en-AU",{timeZone:n.timezone})).get().then((function(e){e.size>0&&e.forEach((function(e){ze(e.data().musing),Ce(!0)}))})),setTimeout((function(){N(!0)}),0)}),[]),n?Object(ae.jsxs)(Be,{children:[Object(ae.jsxs)(me.a,{onClose:function(){return An(!1)},onOpen:function(){return An(!0)},open:Dn,children:[Object(ae.jsx)(me.a.Header,{children:"All Reminders"}),Object(ae.jsx)(me.a.Content,{children:Object(ae.jsx)("div",{style:{height:"300px",overflow:"auto"},children:vn.length>0&&vn.map((function(e){return Object(ae.jsxs)("div",{children:[Object(ae.jsx)("b",{children:e.date})," ",Object(ae.jsx)("br",{}),e.reminder," ",Object(ae.jsx)("br",{})," ",Object(ae.jsx)("br",{})]})}))})}),Object(ae.jsx)(me.a.Actions,{})]}),Object(ae.jsxs)(me.a,{onClose:function(){return C(!1)},onOpen:function(){return C(!0)},open:A,children:[Object(ae.jsx)(me.a.Header,{children:"Find User"}),Object(ae.jsx)(me.a.Content,{children:Object(ae.jsx)(ne.a,{placeholder:"Enter email",onChange:function(e){z(e.target.value)}})}),Object(ae.jsx)(me.a.Actions,{children:Object(ae.jsx)(te.a,{onClick:Object(pe.a)(be.a.mark((function e(){return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:G.firestore().collection("users").where("email","==",S).get().then((function(e){e.docs.length>0?e.forEach((function(e){G.firestore().collection("friends").add({mainUser:n.email,otherUser:e.data().email}).then((function(){i("User followed!",{appearance:"success"}),Zn(),C(!1)})).catch((function(e){i(e.message,{appearance:"error"})}))})):i("This user email is not valid.",{appearance:"error"})})).catch((function(e){console.log(e)}));case 1:case"end":return e.stop()}}),e)}))),children:"Follow"})})]}),Object(ae.jsxs)(me.a,{onClose:function(){return m(!1)},onOpen:function(){return m(!0)},open:p,children:[Object(ae.jsx)(me.a.Header,{children:"Add Quote"}),Object(ae.jsx)(me.a.Content,{children:Object(ae.jsx)(ne.a,{placeholder:"What quote do you want to add?",onChange:function(e){w(e.target.value)}})}),Object(ae.jsx)(me.a.Actions,{children:Object(ae.jsx)(te.a,{onClick:Object(pe.a)(be.a.mark((function e(){return be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Mn(O),m(!1);case 2:case"end":return e.stop()}}),e)}))),children:"Add Quote"})})]}),Object(ae.jsxs)(Ne,{className:"coverPhoto",onClick:function(){An(!0)},children:[Object(ae.jsx)($e,{src:Pe}),pn?Object(ae.jsxs)(tn,{className:pn?"fade-in":null,children:[Object(ae.jsxs)("span",{style:{fontSize:"15px","margin-bottom":"10px"},children:["A reminder from ",Object(ae.jsx)("b",{children:pn[0]})]})," ",Object(ae.jsx)("br",{}),Object(ae.jsx)("span",{style:{fontSize:"10px",lineHeight:"7px",opacity:"0.8"},children:pn[1]})]}):null,fn?Object(ae.jsxs)(an,{className:fn?"fade-in":null,children:[Object(ae.jsxs)("span",{style:{fontSize:"15px","margin-bottom":"10px"},children:["A musing from ",Object(ae.jsx)("b",{children:fn[0]})]})," ",Object(ae.jsx)("br",{}),Object(ae.jsx)("span",{style:{fontSize:"11px",lineHeight:"7px",opacity:"0.8"},children:fn[1]})]}):null,Object(ae.jsx)(nn,{onClick:function(){m(!0)},children:f}),Object(ae.jsx)(on,{children:Object(ae.jsx)(ce.a,{style:{width:"50%"},onSubmit:function(){R&&0!=R.length?(Nn(R),W(!0)):W(!1)},onBlur:function(){R&&0!=R.length?(Nn(R),W(!0)):W(!1)},children:Object(ae.jsxs)(ce.a.Field,{children:[Object(ae.jsx)(cn,{value:R,disabled:!!H,className:"focus-input ".concat(H?"animate-in":""),placeholder:"What is your focus today?",onChange:function(e){q(e.target.value)},ref:En}),Object(ae.jsx)(sn,{pointerCursor:H,onClick:function(){H&&(W(!1),setTimeout((function(){En.current.focus()}),0))},className:H?"fade-in":"",children:Object(ae.jsx)("span",{children:"Today's Focus"})})]})})}),Object(ae.jsx)(en,{src:Pe}),Object(ae.jsx)(Ze,{src:"https://i.ibb.co/9nXdSBd/wallpaperflare-com-wallpaper.jpg",width:"100%",height:"100%"})]}),Object(ae.jsxs)(Me,{expand:K,children:[Object(ae.jsxs)(Ie,{className:"greeting",children:[Object(ae.jsxs)(Ge,{children:[Object(ae.jsx)(Fe.e,{size:25,onClick:function(){X(!K)}}),Object(ae.jsx)(Fe.d,{onClick:function(){G.auth().signOut(),chrome.storage.sync.clear(),t(null)},size:25})]}),Object(ae.jsx)(Re,{children:"Good Morning"}),Object(ae.jsx)(qe,{children:n.name})]}),Object(ae.jsx)(Ve,{children:Object(ae.jsx)(xe.a,{format:"h:mm",ticking:!0,timezone:n.timezone,style:{fontFamily:"productSansBold",fontSize:"80px"}})}),Object(ae.jsx)(Je,{className:s?"fade-in":"",children:s?Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsx)(_e,{children:Object(ae.jsxs)("p",{children:[Math.round(s.main.temp),"\xb0"]})}),Object(ae.jsxs)(We,{children:[Object(ae.jsx)(Ye,{children:n.location.split(",")[0]}),Object(ae.jsx)(Qe,{children:s.weather[0].main})]}),Object(ae.jsx)(He,{src:"http://openweathermap.org/img/wn/".concat(s.weather[0].icon,"@2x.png"),width:"50px",height:"50px"})]}):null})]}),Object(ae.jsxs)(Xe,{expand:K,cardState:re,children:[U.length>0&&"Dad"!=n.name?Object(ae.jsx)(ln,{size:25,className:"reminder-icon",onClick:function(){oe("reminder")}}):null,U.length>0&&"Mum"!=n.name?Object(ae.jsx)(un,{size:25,className:"musing-icon",onClick:function(){oe("musing")}}):null,"normal"===re?Object(ae.jsx)(Ke,{className:"friendCards",expand:K,children:U.length>0?Object(ae.jsx)(Ee,{user:U[0]}):null}):"reminder"===re?Object(ae.jsx)(ae.Fragment,{children:Object(ae.jsxs)(Te,{children:[Object(ae.jsx)(dn,{size:25,onClick:function(){oe("normal")}}),Object(ae.jsx)(ce.a,{onSubmit:function(){Rn(ge),de(!0)},style:{fontSize:"20px"},children:Object(ae.jsxs)(ce.a.Field,{children:["What's something you'd like to gently remind ",U[0].name," about?",Object(ae.jsx)("div",{onClick:function(){ue&&(de(!1),setTimeout((function(){Un.current.focus()}),0))},children:Object(ae.jsx)(rn,Object(he.a)({disabled:ue,value:ge,onChange:function(e){Oe(e.target.value)},ref:Un,className:"".concat(ue?"animate-in":"")},"ref",Un))})]})})]})}):"musing"===re?Object(ae.jsxs)(Te,{children:[Object(ae.jsx)(dn,{size:25,onClick:function(){oe("normal")}}),Object(ae.jsx)(ce.a,{onSubmit:function(){In(Se),Ce(!0)},style:{fontSize:"20px"},children:Object(ae.jsxs)(ce.a.Field,{children:["What's something you've realised recently and want to share with ",U[0].name,"?",Object(ae.jsx)("div",{onClick:function(){Ae&&(Ce(!1),setTimeout((function(){Un.current.focus()}),0))},children:Object(ae.jsx)(rn,{disabled:Ae,value:Se,onChange:function(e){ze(e.target.value)},className:"".concat(Ae?"animate-in":""),ref:Un})})]})})]}):null]})]}):null},hn=V.a.div(X||(X=Object(s.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  flex-direction: column;\n  gap: 10px;\n"]))),jn=function(){Object(ee.useToasts)().addToast;var e=Object(a.useState)(null),n=Object(o.a)(e,2),t=n[0],i=n[1],r=Object(a.useState)(!0),c=Object(o.a)(r,2),s=c[0],d=c[1];return Object(a.useEffect)((function(){try{chrome.storage.sync.get("user",(function(e){e.user?(console.log(e.user),i(e.user)):d(!1)}))}catch(e){i({email:"joetey@stanford.edu",name:"Joseph Tey",timezone:"America/Los_Angeles",location:"San Francisco,US"})}}),[]),Object(a.useEffect)((function(){t&&d(!1)}),[t]),s?Object(ae.jsx)(hn,{children:Object(ae.jsx)(l.a,{active:!0,inverted:!0,children:Object(ae.jsx)(u.a,{inverted:!0})})}):Object(ae.jsx)(ae.Fragment,{children:Object(ae.jsx)(hn,{children:Object(ae.jsx)(fe,{setLoading:d,setUser:i,user:t,children:Object(ae.jsx)(fn,{user:t,setUser:i})})})})},bn=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,277)).then((function(n){var t=n.getCLS,a=n.getFID,i=n.getFCP,r=n.getLCP,c=n.getTTFB;t(e),a(e),i(e),r(e),c(e)}))};t(254);c.a.render(Object(ae.jsx)(i.a.StrictMode,{children:Object(ae.jsx)(ee.ToastProvider,{children:Object(ae.jsx)(jn,{})})}),document.getElementById("root")),bn()}},[[256,1,2]]]);