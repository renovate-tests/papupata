(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"3KYE":function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n("q1tI"),u=r.createContext(!1)},Kg6r:function(t,e,n){"use strict";n.d(e,"j",(function(){return m})),n.d(e,"k",(function(){return g})),n.d(e,"i",(function(){return k})),n.d(e,"a",(function(){return P})),n.d(e,"n",(function(){return w})),n.d(e,"h",(function(){return A})),n.d(e,"g",(function(){return q})),n.d(e,"f",(function(){return T})),n.d(e,"b",(function(){return x})),n.d(e,"e",(function(){return D})),n.d(e,"c",(function(){return R})),n.d(e,"d",(function(){return F})),n.d(e,"m",(function(){return K})),n.d(e,"l",(function(){return J}));var r=n("AcpX"),u=n("vOnD"),a=n("q1tI"),l=n.n(a),c=n("P+0o"),o=n("3KYE"),d=n("qKvR");function i(){var t=Object(r.a)([""]);return i=function(){return t},t}function s(){var t=Object(r.a)([""]);return s=function(){return t},t}function p(){var t=Object(r.a)([""]);return p=function(){return t},t}function b(){var t=Object(r.a)([""]);return b=function(){return t},t}function j(){var t=Object(r.a)([""]);return j=function(){return t},t}function O(){var t=Object(r.a)(["\n  padding: 15px 30px;\n  background: lightyellow;\n"]);return O=function(){return t},t}function f(){var t=Object(r.a)([""]);return f=function(){return t},t}function v(){var t=Object(r.a)([""]);return v=function(){return t},t}function h(){var t=Object(r.a)([""]);return h=function(){return t},t}var m=u.a.section(h()),g=u.a.h4(v()),y=u.a.h5(f()),I=u.a.section(O()),k=function(t){var e=t.children;return Object(d.d)(m,null,Object(d.d)(g,null,"Purpose"),e)},P=function(t){var e=t.version;return Object(d.d)(m,null,Object(d.d)(g,null,"Availability"),"This functionality is available from papupata version ",e," onwards.")},w=function(t){var e=t.children;return Object(d.d)(m,null,Object(d.d)(g,null,"Usage"),e)},A=function(t){var e=t.children,n=t.includeAvailableFrom,r=t.label;return Object(d.d)(m,null,Object(d.d)(o.a.Provider,{value:!!n},Object(d.d)(g,null,"Parameters",r&&": "+r),e?Object(d.d)("table",null,Object(d.d)("thead",null,Object(d.d)("tr",null,Object(d.d)("th",null,"Name"),Object(d.d)("th",null,"Type"),Object(d.d)("th",null,"Description"),n&&Object(d.d)("th",null,"Introduced in"))),Object(d.d)("tbody",null,e)):Object(d.d)("p",null,"There are no parameters.")))},q=function(t){var e=t.children,n=t.name,r=t.dataType,u=t.availableFrom,a=void 0===u?"1.0.0":u,c=l.a.useContext(o.a);return Object(d.d)("tr",null,Object(d.d)("td",null,n),Object(d.d)("td",null,r),Object(d.d)("td",null,e),c&&Object(d.d)("td",null,a))},T=function(t){var e=t.children;return Object(d.d)(m,null,Object(d.d)(g,null,"Returns"),e)},x=function(t){var e=t.children;return Object(d.d)(m,null,Object(d.d)(g,null,"Caveats"),e)},D=function(t){var e=t.children;return Object(d.d)(m,null,Object(d.d)(g,null,"Examples"),e)},R=function(t){var e=t.children,n=t.label;return Object(d.d)(l.a.Fragment,null,n&&Object(d.d)(y,null,n),Object(d.d)(c.a,{language:"typescript"},e))},F=function(t){var e=t.children;return Object(d.d)(I,null,Object(d.d)(y,null,"Common to examples below:"),e)},K=function(t){var e=t.children,n=t.includeAvailableFrom;return Object(d.d)(m,null,Object(d.d)(g,null,"Type parameeters"),Object(d.d)(o.a.Provider,{value:!!n},Object(d.d)(g,null,"Parameters"),e?Object(d.d)("table",null,Object(d.d)("thead",null,Object(d.d)("tr",null,Object(d.d)("th",null,"Name"),Object(d.d)("th",null,"Default value"),Object(d.d)("th",null,"Description"),n?Object(d.d)("th",null,"Introduced in"):"")),Object(d.d)("tbody",null,e)):Object(d.d)("p",null,"There are no parameters.")))},S=u.a.tr(j()),C=u.a.td(b()),E=u.a.td(p()),N=u.a.td(s()),U=u.a.td(i()),J=function(t){var e=t.children,n=t.name,r=t.defaultValue,u=t.availableFrom,a=void 0===u?"none":u,c=l.a.useContext(o.a);return Object(d.d)(S,null,Object(d.d)(C,null,n),Object(d.d)(E,null,r),Object(d.d)(N,null,e),c?Object(d.d)(U,null,a):"")}},MpDW:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return o}));n("q1tI");var r=n("Kg6r"),u=n("TBFr"),a=n("NqE+"),l=n("+ego"),c=n("qKvR");function o(){return Object(c.d)(l.a,null,Object(c.d)(a.a,null,Object(c.d)(u.a,null,Object(c.d)("h1",null,"API Reference"),Object(c.d)("h2",null,"module supertestInvoker"),Object(c.d)("h3",null,"Default export invokeSupertest")),Object(c.d)(r.i,null,"This module allows you to use supertest to make papupata API requests, while gaining access to the actual supertest request for things like setting up headers and making detailed assertions on the response."),Object(c.d)(r.a,{version:"1.5.0"}),Object(c.d)(r.n,null,Object(c.d)(r.c,null,"\n            import invokeSupertest from 'papupata/dist/main/supertestInvoker'\n          "),Object(c.d)("p",null,"To begin with, you'll want to set up a supertest request for your express application. Once done, you can create a supertest papupata adapter to start making API calls."),Object(c.d)("p",null,"Do note that you'll almost certainly want to configure papupata with a blank base URL to make things work.")),Object(c.d)(r.h,null,Object(c.d)(r.g,{name:"supertestRequest",dataType:"Supertest request"},"Supertest request"),Object(c.d)(r.g,{name:"api",dataType:"DeclaredAPI"},"The papupata API you wish to invoke"),Object(c.d)(r.g,{name:"args",dataType:"Object"},"The arguments to the API call, just as you'd pass to the API call normally.")),Object(c.d)(r.f,null,"Papupata MakeRequestAdapter"),Object(c.d)(r.e,null,Object(c.d)(r.c,null,"\n            import { APIDeclaration } from 'papupata'\n            import invokeSupertest from 'papupata/dist/main/supertestInvoker'\n            import express from 'express'\n            import supertest from 'supertest'\n            \n            const app = express()\n            const request = supertest(app)\n            const API = new APIDeclaration()\n            API.configure({\n              app,\n              baseURL: ''\n            })\n            const api = API.declareGetAPI('/:id').params(['id'] as const).response<string>\n\n            const req = invokeSupertest(request, api, {id: 'foo'})\n            await req.expect(200)\n          "))))}}}]);
//# sourceMappingURL=component---src-pages-api-supertest-invoker-tsx-045f37b642d0f399bcb0.js.map