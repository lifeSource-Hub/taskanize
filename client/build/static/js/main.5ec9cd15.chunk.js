(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(e,t,n){e.exports=n(64)},39:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(24),o=n.n(r),l=(n(39),n(25)),u=n(26),i=n(33),m=n(27),s=n(10),b=n(32),h=n(28),E=n.n(h),f=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(i.a)(this,Object(m.a)(t).call(this,e))).onSubmit=n.onSubmit.bind(Object(s.a)(n)),n.state={contacts:[],userEntry:""},n}return Object(b.a)(t,e),Object(u.a)(t,[{key:"onSubmit",value:function(e){e.preventDefault();var t="/first/home";E.a.get(t).then((function(e){return console.log(e.data)})).catch((function(){return console.log("Can\u2019t access "+t+". Blocked by browser?")})),document.getElementById("changeMe").innerHTML=" This is some new text."}},{key:"render",value:function(){return c.a.createElement("main",null,c.a.createElement("h2",null,"Heading"),c.a.createElement("p",{id:"changeMe"},"Lorem Ipsum"),c.a.createElement("br",null),c.a.createElement("button",{onClick:this.onSubmit},"Button"))}}]),t}(a.Component),p=n(29),d=n(7);var g=function(){return c.a.createElement("h3",null,"404 Page Not Found")},v=function(){return c.a.createElement(p.a,null,c.a.createElement(d.c,null,c.a.createElement(d.a,{exact:!0,path:"/ls",component:f}),c.a.createElement(d.a,{component:g})))};o.a.render(c.a.createElement(v,null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.5ec9cd15.chunk.js.map