(this["webpackJsonptimezone-converter"]=this["webpackJsonptimezone-converter"]||[]).push([[0],{187:function(e,t,n){},188:function(e,t,n){},241:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(21),s=n.n(r),i=(n(187),n(39)),o=n(14),u=n(33),l=(n(188),n(258)),j=n(255),d=n(143);n(242);d.a.initializeApp({apiKey:"AIzaSyDyBlYHayJJxJ_39xIk7j3swZt9V1BYxYE",authDomain:"family-gift-85cf0.firebaseapp.com",projectId:"family-gift-85cf0",storageBucket:"family-gift-85cf0.appspot.com",messagingSenderId:"254392565266",appId:"1:254392565266:web:1aec5e8f9249bf774462cb"});var b,h,f,p,O,x,m,g=d.a,v=(n(96),n(34)),w=n(41),y=n(254),C=n(243),S=n(6),k=v.a.div(b||(b=Object(u.a)(["\n  width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n\n  a {\n    text-align: center;\n  }\n"]))),A=function(e){var t=e.setLoading,n=e.setUser,c=e.gotoCreateAccountScreen,r=Object(w.useToasts)().addToast,s=Object(a.useState)(""),u=Object(o.a)(s,2),l=u[0],j=u[1],d=Object(a.useState)(""),b=Object(o.a)(d,2),h=b[0],f=b[1];return Object(S.jsxs)(k,{children:[Object(S.jsx)(y.a,{id:"email",placeholder:"Email",onChange:function(e){j(e.target.value)}}),Object(S.jsx)(y.a,{id:"password",type:"password",placeholder:"Password",onChange:function(e){f(e.target.value)}}),Object(S.jsx)("br",{}),Object(S.jsx)(C.a,{onClick:function(){g.auth().setPersistence(g.auth.Auth.Persistence.LOCAL).then((function(){return t(!0),g.auth().signInWithEmailAndPassword(l,h).then((function(e){var a=e.user;g.firestore().collection("users").doc(e.user.uid).get().then((function(e){e.exists?(n(Object(i.a)(Object(i.a)({},a),e.data())),t(!1)):(t(!1),r("Extra user info doesn't exist",{appearance:"error"}))})).catch((function(e){r(e.message,{appearance:"error"})}))})).catch((function(e){r(e.message,{appearance:"error"}),t(!1)}))})).catch((function(e){r(e.message,{appearance:"error"}),t(!1)}))},children:"Login"}),Object(S.jsx)("br",{}),Object(S.jsx)("a",{onClick:function(){c()},children:"Create Account"})]})},F=n(256),U=n(170),E=n(169),L=n.n(E),T=v.a.div(h||(h=Object(u.a)(["\n  width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n\n  button {\n    width: 100%;\n  }\n"]))),z=function(e){var t=e.setLoading,n=e.setUser,c=e.gotoLoginScreen,r=Object(w.useToasts)().addToast,s=Object(a.useState)(""),u=Object(o.a)(s,2),l=u[0],j=u[1],d=Object(a.useState)(Intl.DateTimeFormat().resolvedOptions().timeZone),b=Object(o.a)(d,2),h=b[0],f=b[1],p=Object(a.useState)(""),O=Object(o.a)(p,2),x=O[0],m=O[1],v=Object(a.useState)(""),k=Object(o.a)(v,2),A=k[0],E=k[1],z=Object(a.useState)(""),P=Object(o.a)(z,2),I=P[0],B=P[1];return Object(S.jsxs)(T,{children:[Object(S.jsx)("a",{onClick:function(){c()},children:"Back"}),Object(S.jsx)("br",{}),Object(S.jsxs)(F.a,{autoComplete:"off",children:[Object(S.jsx)(F.a.Field,{children:Object(S.jsx)(y.a,{id:"email",placeholder:"Email",onChange:function(e){j(e.target.value)}})}),Object(S.jsx)(F.a.Field,{children:Object(S.jsx)(y.a,{id:"name",placeholder:"Name",onChange:function(e){B(e.target.value)}})}),Object(S.jsx)(F.a.Field,{children:Object(S.jsx)(L.a,{placeholder:"Enter a city/suburb",apiKey:"AIzaSyAoo4AxObgyDTt93omLUjila-ircLZX5_s",onPlaceSelected:function(e){var t=e.address_components.find((function(e){return e.types.includes("country")})).short_name,n=e.address_components[0].long_name;m("".concat(n,", ").concat(t))}})}),Object(S.jsx)(F.a.Field,{children:Object(S.jsx)(U.a,{value:h,onChange:f})}),Object(S.jsx)(F.a.Field,{children:Object(S.jsx)(y.a,{id:"password",type:"password",placeholder:"Password",onChange:function(e){E(e.target.value)}})}),Object(S.jsx)("br",{}),Object(S.jsx)(C.a,{onClick:function(){g.auth().setPersistence(g.auth.Auth.Persistence.LOCAL).then((function(){return t(!0),g.auth().createUserWithEmailAndPassword(l,A).then((function(e){var a=e.user,c={timezone:h.value?h.value:h,name:I,email:l,location:x};g.firestore().collection("users").doc(e.user.uid).set(c).then((function(e){n(Object(i.a)(Object(i.a)({},a),c)),t(!1),r("You have successfully created your account!",{appearance:"success"})})).catch((function(e){t(!1),r(e.message,{appearance:"error"})}))})).catch((function(e){r(e.message,{appearance:"error"}),t(!1)}))})).catch((function(e){r(e.message,{appearance:"error"}),t(!1)}))},children:"Create Acount"})]})]})},P=function(e){var t=e.setUser,n=e.user,c=e.setLoading,r=e.children,s=Object(a.useState)("login"),i=Object(o.a)(s,2),u=i[0],l=i[1];return n?Object(S.jsx)(S.Fragment,{children:r}):Object(S.jsx)(S.Fragment,{children:"login"===u?Object(S.jsx)(A,{setLoading:c,setUser:t,gotoCreateAccountScreen:function(){l("create-account")}}):"create-account"===u?Object(S.jsx)(z,{setLoading:c,setUser:t,gotoLoginScreen:function(){l("login")}}):Object(S.jsx)("div",{children:"Error occurred"})})},I=n(36),B=n.n(I),_=n(67),D=n(257),J=n(261),Y=n(260),Z=n(122),q=n.n(Z),H=n(123),K=n.n(H),M=Object(v.a)(Y.a)(f||(f=Object(u.a)(["\n  p {\n    font-size: 20px;\n  }\n"]))),W=function(e){var t=e.user,n=Object(a.useState)(null),c=Object(o.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){(function(){var e=Object(_.a)(B.a.mark((function e(){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.a.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(t.location,"&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric"));case 2:n=e.sent,s({main:n.data.main,weather:n.data.weather});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(S.jsxs)(M,{children:[Object(S.jsxs)("p",{children:["At ",t.location.split(",")[0],", it is currently ",Object(S.jsx)(q.a,{format:"h:mm A",ticking:!0,timezone:t.timezone}),"."]}),Object(S.jsxs)("p",{children:[t.name," is probably sleeping, while thinking about you :)"]}),Object(S.jsxs)("p",{children:["It's currently ",r?Object(S.jsxs)(S.Fragment,{children:[r.main.temp,"\xb0C"]}):null]})]})},G=v.a.div(p||(p=Object(u.a)(["\n  position: absolute;\n  top: 5px;\n  right: 5px;\n"]))),N=v.a.div(O||(O=Object(u.a)(["\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  height: 40px;\n"]))),V=(v.a.div(x||(x=Object(u.a)(["\n  display: flex;\n  gap: 30px;\n"]))),function(e){var t=e.user,n=e.setUser,c=Object(w.useToasts)().addToast,r=Object(a.useState)(null),s=Object(o.a)(r,2),i=s[0],u=s[1],l=Object(a.useState)(""),j=Object(o.a)(l,2),d=j[0],b=j[1],h=Object(a.useState)(!1),f=Object(o.a)(h,2),p=f[0],O=f[1],x=Object(a.useState)([]),m=Object(o.a)(x,2),v=m[0],k=m[1],A=function(){var e=Object(_.a)(B.a.mark((function e(){var n,a,c;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,g.firestore().collection("friends").where("mainUser","==",t.email).get();case 3:e.sent.forEach((function(e){return n.push(e.data().otherUser)})),a=[],c=0;case 7:if(!(c<n.length)){e.next=15;break}return e.next=10,g.firestore().collection("users").where("email","==",n[c]).get();case 10:e.sent.forEach((function(e){return a.push(e.data())}));case 12:c++,e.next=7;break;case 15:k(a);case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){(function(){var e=Object(_.a)(B.a.mark((function e(){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.a.get("https://api.openweathermap.org/data/2.5/weather?q=".concat(t.location,"&appid=311bafebdf0eea75bbc8bf0076efb2b0&units=metric"));case 2:n=e.sent,u({main:n.data.main,weather:n.data.weather});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),A()}),[]),t?Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(G,{children:Object(S.jsxs)(N,{children:[Object(S.jsx)("div",{children:t.email}),Object(S.jsx)(C.a,{onClick:function(){O(!0)},children:"Follow User"}),Object(S.jsx)(C.a,{onClick:Object(_.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.auth().signOut(),n(null);case 2:case"end":return e.stop()}}),e)}))),children:"Sign-Out"})]})}),v.map((function(e,t){return Object(S.jsx)(W,{user:e,index:t})})),Object(S.jsxs)(D.a,{onClose:function(){return O(!1)},onOpen:function(){return O(!0)},open:p,children:[Object(S.jsx)(D.a.Header,{children:"Find User"}),Object(S.jsx)(D.a.Content,{children:Object(S.jsx)(y.a,{placeholder:"Enter email",onChange:function(e){b(e.target.value)}})}),Object(S.jsx)(D.a.Actions,{children:Object(S.jsx)(C.a,{onClick:Object(_.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.firestore().collection("users").where("email","==",d).get().then((function(e){e.docs.length>0?e.forEach((function(e){g.firestore().collection("friends").add({mainUser:t.email,otherUser:e.data().email}).then((function(){c("User followed!",{appearance:"success"}),A(),O(!1)})).catch((function(e){c(e.message,{appearance:"error"})}))})):c("This user email is not valid.",{appearance:"error"})})).catch((function(e){console.log(e)}));case 1:case"end":return e.stop()}}),e)}))),children:"Follow"})})]}),Object(S.jsx)("br",{}),Object(S.jsx)(q.a,{format:"h:mm A",ticking:!0,timezone:t.timezone,style:{fontSize:"60px"}}),Object(S.jsxs)(J.a,{children:["Good Morning, ",t.name]}),Object(S.jsxs)(Y.a,{children:[t.location," | ",t.timezone," | ",i?Object(S.jsxs)(S.Fragment,{children:[i.main.temp,"\xb0C"]}):null]})]}):null}),X=v.a.div(m||(m=Object(u.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  flex-direction: column;\n  gap: 10px;\n"]))),Q=function(){var e=Object(w.useToasts)().addToast,t=Object(a.useState)(null),n=Object(o.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!0),u=Object(o.a)(s,2),d=u[0],b=u[1];return Object(a.useEffect)((function(){g.auth().onAuthStateChanged((function(t){t?g.firestore().collection("users").doc(g.auth().currentUser.uid).get().then((function(t){t.exists?r(Object(i.a)(Object(i.a)({},g.auth().currentUser),t.data())):e("Extra user info doesn't exist",{appearance:"error"}),b(!1)})).catch((function(t){e(t.message,{appearance:"error"})})):b(!1)}))}),[]),d?Object(S.jsx)(X,{children:Object(S.jsx)(l.a,{active:!0,inverted:!0,children:Object(S.jsx)(j.a,{inverted:!0})})}):Object(S.jsx)(S.Fragment,{children:Object(S.jsx)(X,{children:Object(S.jsx)(P,{setLoading:b,setUser:r,user:c,children:Object(S.jsx)(V,{user:c,setUser:r})})})})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,263)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};n(240);s.a.render(Object(S.jsx)(c.a.StrictMode,{children:Object(S.jsx)(w.ToastProvider,{children:Object(S.jsx)(Q,{})})}),document.getElementById("root")),R()}},[[241,1,2]]]);