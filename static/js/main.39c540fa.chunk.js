(this.webpackJsonpchatroom=this.webpackJsonpchatroom||[]).push([[0],{36:function(e,t,n){e.exports=n(57)},55:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(21),c=n.n(s),o=n(13),u=n(23),l=n(24),i=n(8),m="SET_SELF",f="SET_USERS",d="REMOVE_USER",E="ADD_MESSAGES",g="DELETE_MESSAGES";function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{type:m,name:e,id:t}}function p(e){return{type:E,message:e}}function b(){return function(e,t){e(y()),i.database().ref("users").on("value",(function(n){var a=[];if(null!=n.val())for(var r=0,s=Object.entries(n.val());r<s.length;r++){var c=s[r],o=Object(l.a)(c,2),u=o[0],i=o[1];a.push({name:i.name,id:u})}if(""!==t().users.self.name&&a.length){var m=a[a.length-1].name;if(-1===t().users.list.findIndex((function(e){return e.name===m}))){var d=m===t().users.self.name?"YOU HAVE":m+" HAS";e(p({type:"userJoined",user:d,content:"JOINED THE CHAT"}))}}e({type:f,list:a})})),i.database().ref("users").on("child_removed",(function(n){n.val().name===t().users.self.name?e(p({type:"userLeft",user:"",content:"YOU HAVE DISCONNECTED FROM THE CHAT"})):e(p({type:"userLeft",user:n.val().name,content:"HAS LEFT THE CHAT"}))}))}}function v(e){return function(t){i.database().ref("users/".concat(e)).remove(),i.database().ref("users").off(),t(h()),t((function(e,t){e({type:g}),i.database().ref("chat").off(),t().users.list.length||i.database().ref("chat").remove()}))}}function y(e){return function(e,t){i.database().ref("chat").on("child_added",(function(n){t().users.self.name&&e(p(n.val()))}))}}n(55);var O=n(15);function S(e){var t=Object(a.useState)(!1),n=Object(l.a)(t,2),s=n[0],c=n[1];return Object(a.useEffect)((function(){document.getElementById("name").focus(),e.getUsers()}),[]),r.a.createElement("div",{id:"logIn"},r.a.createElement("div",{id:"leftPanel"},r.a.createElement("h1",null,"Chat Room"),r.a.createElement("p",null,e.users.list.length," USERS ONLINE")),r.a.createElement("div",{id:"rightPanel"},r.a.createElement("form",{autoComplete:"off"},r.a.createElement("h2",null,"Enter Chat Room:"),r.a.createElement("div",{className:"textbox-logo"},r.a.createElement("input",{onChange:function(t){var n=t.currentTarget.value,a=!e.users.list.filter((function(e){return e.name===n})).length;c(a&&0!==n.length),document.getElementById("nameAlert").style.visibility=!a&&n.length?"visible":"hidden"},type:"text",id:"name",placeholder:"Enter nickname"}),s&&r.a.createElement(O.b,{to:"/chat/room"}," ",r.a.createElement("button",{id:"enterBtn",onClick:function(){e.addSelfToDataBase(document.getElementById("name").value)}}))),r.a.createElement("p",{id:"nameAlert",style:{visibility:"hidden"}},"USERNAME HAS ALREADY BEEN TAKEN"))))}function j(e){return r.a.createElement("div",{id:"YOU"===e.userName?"selfMessage":"userMessage"},r.a.createElement("p",{id:"userName"},!e.sameUser&&e.userName),r.a.createElement("div",null,r.a.createElement("p",null,e.message.timeStamp),r.a.createElement("h3",null,e.message.content)))}function w(e){return Object(a.useEffect)((function(){return document.getElementById("messageBox").focus()})),r.a.createElement("div",{id:"chatRoom"},r.a.createElement("header",null,r.a.createElement("p",null,r.a.createElement("span",null,"\u2022")," You",e.users.list.filter((function(t){return t.name!==e.users.self.name})).map((function(e){return", ".concat(e.name," ")}))),r.a.createElement(O.b,{to:"/chat",onClick:function(){return e.deleteSelf(e.users.self.id)}},r.a.createElement("button",null))),r.a.createElement("div",{id:"chatBody"},e.messages.list.map((function(t,n){var a=t.user===e.users.self.name?"YOU":t.user.toUpperCase(),s=n>1&&e.messages.list[n-1].user===t.user;return"message"===t.type?r.a.createElement(j,{key:n,message:t,userName:a,sameUser:s}):r.a.createElement("p",{key:n,id:"newUser"},"".concat(a," ").concat(t.content))}))),r.a.createElement("footer",null,r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var n=document.getElementById("messageBox");n.value.length&&(e.sendMessage(n.value,"".concat((new Date).getHours(),":").concat((new Date).getMinutes()),e.users.self.name),n.value="")},autoComplete:"off"},r.a.createElement("input",{type:"text",onChange:function(e){document.getElementById("sendBtn").style.visibility=e.currentTarget.value.length?"visible":"hidden"},placeholder:"Enter message",id:"messageBox"}),r.a.createElement("button",{id:"sendBtn"}))))}var D=Object(u.b)((function(e){return{users:e.users,messages:e.messages}}),(function(e){return{addSelfToDataBase:function(t){e(function(e){return function(t){var n=String(Date.now());t(h(e,n)),i.database().ref("users/".concat(n)).set({name:e},(function(){return t(h(e,n))})),i.database().ref("users/".concat(n)).onDisconnect().remove()}}(t))},getUsers:function(){e(b())},deleteSelf:function(t){e(v(t))},addMessageListener:function(){e(y())},sendMessage:function(t,n,a){e(function(e,t,n){return function(a){i.database().ref("chat").push().set({type:"message",content:e,timeStamp:t,user:n})}}(t,n,a))}}}))((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/chat",render:function(t){return r.a.createElement(S,Object.assign({},t,e))}}),r.a.createElement(o.a,{exact:!0,path:"/chat/room",render:function(t){return r.a.createElement(w,Object.assign({},t,e))}})))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A=n(16),B=n(33),T=n(35),I=n(34);function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){Object(I.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N={self:{name:"",id:""},list:[]},H={list:[]};var M=Object(A.c)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return U({},e,{self:{name:t.name,id:t.id}});case f:return U({},e,{list:t.list});case d:return U({},e,{list:e.list.filter((function(e){return e.name!==t.name}))});default:return e}},messages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return{list:[].concat(Object(T.a)(e.list),[t.message])};case g:return H;default:return e}}}),k=Object(A.d)(M,Object(A.a)(B.a));i.initializeApp({apiKey:"AIzaSyDlr7lzC7eunsm6NtcTV2bfXLhfM618fz0",authDomain:"chatroom-2eb3f.firebaseapp.com",databaseURL:"https://chatroom-2eb3f.firebaseio.com",projectId:"chatroom-2eb3f",storageBucket:"chatroom-2eb3f.appspot.com",messagingSenderId:"398638027058",appId:"1:398638027058:web:d52c3e41f6f8a75421472b",measurementId:"G-HEE2T4312L"}),c.a.render(r.a.createElement(u.a,{store:k},r.a.createElement(O.a,null,r.a.createElement(D,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[36,1,2]]]);
//# sourceMappingURL=main.39c540fa.chunk.js.map