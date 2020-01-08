(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{443:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return i}));n(1);var r=n(431),a=n(430),c=n(128),d=n(432),l=n(473),u=n(0);function i(){return Object(u.d)(r.a,null,Object(u.d)(a.a,null,Object(u.d)(c.a,null,Object(u.d)("h1",null,"API Reference"),Object(u.d)("h2",null,"interface DeclaredAPI")),Object(u.d)(d.i,null,"Represents a declared API and allow interacting with it."),Object(u.d)(d.n,null,Object(u.d)("p",null,'Technically there is nothing called "DeclaredAPI" in the code base. This is simply a representation of what is returned when an API has been declared.'),Object(u.d)("p",null,"Some of the types used for the API are exposed in an unusual fashion. In the future we might look into adding some wrapper types that allow for more conventional means for accessing them.")),Object(u.d)(l.b,{context:"DeclaredAPI"},Object(u.d)(l.c,{name:"invoke",displayName:"()",dataType:"Promise<ResponseType>"},"DeclaredAPI itself is a function, which can be called to call the API itself. The response is returned wrapped in a promise. Error handling is dependant on the adapter being used."),Object(u.d)(l.c,{name:"getURL",dataType:"string"},"Returns URL to the API."),Object(u.d)(l.c,{name:"implement",dataType:"void"},"Implement an API."),Object(u.d)(l.c,{name:"implementWithMiddleware",dataType:"void"},"Implement an API, providing additional middleware for it."),Object(u.d)(l.a,{name:"ResponseType"},"The type of the response."),Object(u.d)(l.a,{name:"ServerResponseType"},"The type of the response as the server returns it."),Object(u.d)(l.a,{name:"CallArgsType"},"The type of the parameter object passed to invoke the API."),Object(u.d)(l.a,{name:"RequestType"},"The type of the modified express request passed to the impementing function.")),Object(u.d)(d.e,null,Object(u.d)(d.c,{label:"Using the exposed types"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            const myAPI = api.declarePostAPI('/do-stuff/:pathParam')              \n              .response<string>()\n\n            type RespType = typeof myAPI['ResponseType']\n            // RespType is now string\n          "))))}},473:function(e,t,n){"use strict";n.d(t,"b",(function(){return I})),n.d(t,"c",(function(){return w})),n.d(t,"d",(function(){return A})),n.d(t,"a",(function(){return g}));n(22);var r=n(432),a=n(1),c=n(5),d=n(48),l=n(0);function u(){var e=j([""]);return u=function(){return e},e}function i(){var e=j([""]);return i=function(){return e},e}function o(){var e=j([""]);return o=function(){return e},e}function s(){var e=j([""]);return s=function(){return e},e}function p(){var e=j([""]);return p=function(){return e},e}function b(){var e=j([""]);return b=function(){return e},e}function j(e,t){return t||(t=e.slice(0)),e.raw=t,e}var h=c.a.tr(b()),f=c.a.td(p()),O=c.a.td(s()),m=c.a.td(o()),y=c.a.td(i()),v=c.a.td(u()),T=Object(a.createContext)({context:""}),P=function(e){var t=e.name,n=e.children,r=Object(a.useContext)(T).context;return Object(l.d)(f,null,Object(l.d)(d.a,{to:"/api/"+r+"/"+t},n||t))},I=function(e){var t=e.children,n=e.context,a=e.includeRequiredColumn;return Object(l.d)(r.j,null,Object(l.d)(T.Provider,{value:{context:n}},Object(l.d)(r.k,null,"Members"),Object(l.d)("table",null,Object(l.d)("thead",null,Object(l.d)("th",null,"Name"),Object(l.d)("th",null,"Type"),Object(l.d)("th",null,"Data type/return type"),Object(l.d)("th",null,"Description"),a&&Object(l.d)("th",null,"Required")),Object(l.d)("tbody",null,t))))},w=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required,c=e.displayName;return Object(l.d)(h,null,Object(l.d)(P,{name:n},c),Object(l.d)(O,null,"method"),Object(l.d)(m,null,r),Object(l.d)(y,null,t),void 0!==a&&Object(l.d)(v,null,!0===a?"Yes":!1===a?"No":a))},A=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required;return Object(l.d)(h,null,Object(l.d)(f,null,n),Object(l.d)(O,null,"property"),Object(l.d)(m,null,r),Object(l.d)(y,null,t),void 0!==a&&Object(l.d)(v,null,!0===a?"Yes":!1===a?"No":a))},g=function(e){var t=e.children,n=e.name;return Object(l.d)(h,null,Object(l.d)(f,null,n),Object(l.d)(O,null,"property"),Object(l.d)(m,null,"n/a"),Object(l.d)(y,null,t,". Type type itself must be accessed using the typeof operator."))}}}]);
//# sourceMappingURL=component---src-pages-api-declared-api-tsx-341fe07c0fbb9a470848.js.map