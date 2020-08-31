(window.webpackJsonp=window.webpackJsonp||[]).push([[48,36],{443:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d})),n.d(t,"OptionsTable",(function(){return s}));n(1);var r=n(439),a=n(135),u=n(509),l=n(512),o=n(440),c=n(441),i=n(0);function d(){return Object(i.d)(c.a,null,Object(i.d)(o.a,null,Object(i.d)(a.a,null,Object(i.d)("h1",null,"API Reference"),Object(i.d)("h2",null,"module invokeImplementationAdapter"),Object(i.d)("h3",null,"Default export createInvokeImplementationAdapter")),Object(i.d)(r.i,null,"This module allows you to use invoke implemented APIs with no express server. This is primarily used for testing."),Object(i.d)(r.a,{version:"1.5.0"}),Object(i.d)(r.n,null,Object(i.d)(r.c,null,"\n            import createInvokeImplementationAdapter from 'papupata/dist/main/invokeImplementationAdapter'\n          "),Object(i.d)("p",null,"Call the function with any options you wish and use the returned value as the ",Object(i.d)(u.a,null,"makeRequest")," of the APIDeclaration. As always, a base url needs to be set up to make calls, but its value is ultimately irrelevant when using this adapter.")),Object(i.d)(r.h,null,Object(i.d)(r.g,{name:"options",dataType:"Object?"},Object(i.d)(s,null))),Object(i.d)(r.f,null,"Papupata MakeRequestAdapter"),Object(i.d)(r.e,null,Object(i.d)(r.c,null,"\n            import { APIDeclaration } from 'papupata'\n            import createInvokeImplementationAdapter from 'papupata/dist/main/invokeImplementationAdapter'\n            import express from 'express'\n            \n            const app = express()\n            const request = supertest(app)\n            const API = new APIDeclaration()\n            API.configure({\n              app,\n              baseURL: '',\n              makeRequest: createInvokeImplementationAdapter()\n            })\n\n          "))))}function s(){return Object(i.d)(l.b,{context:"options",includeRequiredColumn:!0},Object(i.d)(l.c,{name:"createRequest",dataType:"(requestBase) => Request",required:!1},Object(i.d)("p",null,"This function is used to create the request passed to the API as if it was the express request. Its sole parameter is a very minimal version of the request, which you may use as a template."),Object(i.d)("p",null,"This method can be used to add any necessary fields to the request."),Object(i.d)(r.c,null,"\n           const createRequest = base => ({...base, headers: { 'content-type': 'text/html' }})\n       ")),Object(i.d)(l.c,{name:"assertResponse",dataType:"(response) => void",required:!1},Object(i.d)("p",null,"This function is called once the response is complete. It is passed a mock express response, allowing for making assertions to whatever it may contain."),Object(i.d)(r.c,null,"\n           const assertResponse = res => expect(res.statusCode).toEqual(400)\n       ")),Object(i.d)(l.d,{name:"withMiddleware",dataType:"boolean",required:!1},Object(i.d)("p",null,"By default, and if explicitly set to false only the API implementation is called and all middleware is ignored."),Object(i.d)("p",null,"If set to true, any express and papupata middleware on the route is run as normal for the requests.")))}},489:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return i}));n(1);var r=n(439),a=n(135),u=n(440),l=n(441),o=n(443),c=n(0);function i(){return Object(c.d)(l.a,null,Object(c.d)(u.a,null,Object(c.d)(a.a,null,Object(c.d)("h1",null,"API Reference"),Object(c.d)("h2",null,"module testInvoker"),Object(c.d)("h3",null,"Default export testInvoke")),Object(c.d)(r.i,null,"This module allows you to use invoke implemented APIs with no express server. This is primarily used for testing."),Object(c.d)(r.a,{version:"1.5.0"}),Object(c.d)(r.n,null,Object(c.d)(r.c,null,"\n            import testInvoke from 'papupata/dist/main/testInvoker'\n          "),Object(c.d)("p",null,"Call the function with the DeclaredAPI you wish to invoke and any parameters you wish to pass to it, as if you were calling it normally.")),Object(c.d)(r.h,null,Object(c.d)(r.g,{name:"api",dataType:"DeclaredAPI"},"The API you wish to invoke"),Object(c.d)(r.g,{name:"args",dataType:"Object"},"Arguments to the API. Non-object bodies are not supported."),Object(c.d)(r.g,{name:"options",dataType:"Object?"},Object(c.d)(o.OptionsTable,null))),Object(c.d)(r.f,null,"Papupata MakeRequestAdapter"),Object(c.d)(r.e,null,Object(c.d)(r.c,{label:"Basic case"},"\n            import { APIDeclaration } from 'papupata'\n            import testInvoke from 'papupata/dist/main/testInvoker'\n            import express from 'express'\n            \n            const app = express()\n            const request = supertest(app)\n            const API = new APIDeclaration()\n            const api = API.declareGetAPI('/').query(['id'] as const).response<string>()\n\n            testInvoke(api, {id: '123'})\n            \n\n          "),Object(c.d)(r.c,{label:"With options"},"\n            testInvoke(api, {id: '123'}, {withMiddleware: true})\n          "))))}},509:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return b})),n.d(t,"a",(function(){return j}));n(510),n(1);var r=n(439),a=n(4),u=n(0);function l(){var e=i(['\n  font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace\n']);return l=function(){return e},e}function o(){var e=i(["\n  font-size: 1.1em;\n"]);return o=function(){return e},e}function c(){var e=i([""]);return c=function(){return e},e}function i(e,t){return t||(t=e.slice(0)),e.raw=t,e}function d(e){var t=e.children;return Object(u.d)(r.j,null,Object(u.d)(r.k,null,"Overview"),t)}var s=a.a.h4(c()),p=a.a.h5(o());function b(e){var t=e.content;return Object(u.d)("div",null,Object(u.d)(r.j,null,Object(u.d)(r.k,null,"Table of contents"),Object(u.d)("ul",null,t.map((function(e){return Object(u.d)("li",{style:{marginLeft:18*(e.level||0)},key:e.anchor},Object(u.d)("a",{href:"#"+e.anchor},e.heading))})))),t.map((function(e){var t=e.level?p:s;return Object(u.d)(r.j,{id:e.anchor,key:e.anchor},Object(u.d)(t,null,e.heading),e.content)})))}var j=a.a.span(l())},510:function(e,t,n){"use strict";n(109)("anchor",(function(e){return function(t){return e(this,"a","name",t)}}))},512:function(e,t,n){"use strict";n.d(t,"b",(function(){return T})),n.d(t,"c",(function(){return g})),n.d(t,"d",(function(){return R})),n.d(t,"a",(function(){return C}));n(513),n(26);var r=n(439),a=n(1),u=n.n(a),l=n(4),o=n(47),c=n(77),i=n(0);function d(){var e=f([""]);return d=function(){return e},e}function s(){var e=f([""]);return s=function(){return e},e}function p(){var e=f([""]);return p=function(){return e},e}function b(){var e=f([""]);return b=function(){return e},e}function j(){var e=f([""]);return j=function(){return e},e}function O(){var e=f([""]);return O=function(){return e},e}function m(){var e=f([""]);return m=function(){return e},e}function f(e,t){return t||(t=e.slice(0)),e.raw=t,e}var h=l.a.tr(m()),v=l.a.td(O()),y=l.a.td(j()),I=l.a.td(b()),w=l.a.td(p()),k=l.a.td(s()),A=l.a.td(d());function q(e){var t=e.children,n=Object(a.useContext)(x).includeRequiredColumn;if(!n&&t)throw new Error("Being asked to show required cell, yet it does not exist");return n?Object(i.d)(k,null,t):null}var x=Object(a.createContext)({context:"",includeRequiredColumn:!1}),P=function(e){var t=e.name,n=e.children,r=Object(a.useContext)(x).context;return Object(i.d)(v,null,Object(i.d)(o.a,{to:"/api/"+r+"/"+t},n||t))},T=function(e){var t=e.children,n=e.context,a=e.includeRequiredColumn,u=e.includeAvailableFrom;return Object(i.d)(r.j,null,Object(i.d)(x.Provider,{value:{context:n,includeRequiredColumn:!!a}},Object(i.d)(c.a.Provider,{value:!!u},Object(i.d)(r.k,null,"Members"),Object(i.d)("table",null,Object(i.d)("thead",null,Object(i.d)("th",null,"Name"),Object(i.d)("th",null,"Type"),Object(i.d)("th",null,"Data type/return type"),Object(i.d)("th",null,"Description"),a&&Object(i.d)("th",null,"Required"),u&&Object(i.d)("th",null,"Introduced in")),Object(i.d)("tbody",null,t)))))},g=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required,l=e.displayName,o=e.availableFrom,d=u.a.useContext(c.a);return Object(i.d)(h,null,Object(i.d)(P,{name:n},l),Object(i.d)(y,null,"method"),Object(i.d)(I,null,r),Object(i.d)(w,null,t),Object(i.d)(q,null,!0===a?"Yes":!1===a?"No":a),d?Object(i.d)(A,null,o):"")},R=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required,l=e.availableFrom,o=e.link,d=u.a.useContext(c.a);return Object(i.d)(h,null,o?Object(i.d)(P,{name:n},n):Object(i.d)(v,null,n),Object(i.d)(y,null,"property"),Object(i.d)(I,null,r),Object(i.d)(w,null,t),Object(i.d)(q,null,!0===a?"Yes":!1===a?"No":a),d?Object(i.d)(A,null,l):"")},C=function(e){var t=e.children,n=e.name;return Object(i.d)(h,null,Object(i.d)(v,null,n),Object(i.d)(y,null,"property"),Object(i.d)(I,null,"n/a"),Object(i.d)(w,null,t,". Type type itself must be accessed using the typeof operator."))}},513:function(e,t,n){"use strict";n(109)("link",(function(e){return function(t){return e(this,"a","href",t)}}))}}]);
//# sourceMappingURL=component---src-pages-api-test-invoker-tsx-cf919d803bef5fe22a91.js.map