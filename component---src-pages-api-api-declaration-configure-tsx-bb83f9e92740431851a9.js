(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{438:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(432),a=n(431),o=n(129),i=n(433),u=n(474),l=n(48),c=n(475),d=n(0);function s(){return Object(d.d)(r.a,null,Object(d.d)(a.a,null,Object(d.d)(o.a,null,Object(d.d)("h1",null,"API Reference"),Object(d.d)("h2",null,"class APIDeclaration"),Object(d.d)("h3",null,"method configure")),Object(d.d)(i.i,null,"Configures papupata for implementing or calling APIs."),Object(d.d)(i.n,null,"This method must be called before any of the declared APIs are implemented or called. Failure to having done so will cause the operation to fail."),Object(d.d)(i.h,null,Object(d.d)(i.g,{name:"config",dataType:Object(d.d)("a",{href:"#config"},"Config")},"Configuration. See below. Instead of an actual config null can be provided to unconfigure papupata, which can be useful to reset things for tests, for example.")),Object(d.d)(i.f,null,"Nothing"),Object(d.d)("h3",{id:"config"},"config object"),Object(d.d)(u.b,{includeRequiredColumn:!0,context:"APIDeclaration/configure",includeAvailableFrom:!0},Object(d.d)(u.d,{name:"baseURL",dataType:"string",required:"Conditionally *1"},"Base URL used for all API invocations. This can be an empty string, in which case the calls on the browser are made relative to the root of the current host."),Object(d.d)(u.d,{name:"makeRequest",dataType:"Function",required:"Conditionally *2"},Object(d.d)("p",null,"This function is used internally for calling APIs. The function is as follows:"),Object(d.d)(i.h,{includeAvailableFrom:!0},Object(d.d)(i.g,{name:"method",dataType:"string"}),Object(d.d)(i.g,{name:"url",dataType:"string"}),Object(d.d)(i.g,{name:"query",dataType:"object"}),Object(d.d)(i.g,{name:"body",dataType:"object"}),Object(d.d)(i.g,{name:"params",dataType:"object",availableFrom:"1.2.0"},"Do note that params are already baked into the URL, there is no need for the function to do that."),Object(d.d)(i.g,{name:"route",dataType:"object/function"},"This is the object/function for route being invoked. For most uses this should be completely unnecessary, but this can be used to allow for special behavior for particular routes. If options have been defined on the route, you can access them from route.options."),Object(d.d)(i.g,{name:"requestOptions",dataType:"varies"},"If request options are used, then they are passed as this parameter.")),Object(d.d)(i.f,null,"Promise","<any>","; the promise, on a successful request, should resolve with the response type of the declared request. Typically this means parsing the JSON data."),Object(d.d)("p",null,"Two adapters are supplied with papupata, ",Object(d.d)(l.a,{to:"/api/fetchAdapter"},"one for fetch")," and"," ",Object(d.d)(l.a,{to:"/api/requestPromiseAdapter"},"one for request-promise"),".")),Object(d.d)(u.d,{name:"app",dataType:"Express application",required:"Conditionally *3"},"Express application, on which the declared APIs will be attached. If you make sure all the api declarations are invoked as the routing is being set up then using the application is fine, but if there is a chance that routes will be added later then the router is the better option."),Object(d.d)(u.d,{name:"router",dataType:"Express router",required:"Conditionally *3"},"Express router, on which the declared APIs will be attached. The main advantage of using a router over app is that APIs can be added after the whole application has been configured, assuming no middleware is added to the router itself after the routes."),Object(d.d)(u.d,{name:"routerAt",dataType:"string",availableFrom:"1.4.0"},Object(d.d)("p",null,"It often makes sense to declare APIs on top a common base URL. In practice though you might have a router set up for a specific path, for example to add common middleware."),Object(d.d)("p",null,"By setting routerAt, you explicitly indicate that the provided router will be at the given path. All routes on an API declaration with routerAt MUST have the routerAt as the start of their path."))),Object(d.d)("div",null,"*1: For invoking APIs or calling the getURL method on them"),Object(d.d)("div",null,"*2: For invoking APIs"),Object(d.d)("div",null,"*3: For implementing APIs exactly one of either app or router must be provided"),Object(d.d)(i.e,null,Object(d.d)(i.d,null,"For all examples below, it is assumed that the API declaration happens in ./api.ts such as this:",Object(d.d)(i.c,{label:"api.ts"},"\n            import {APIDeclaration} from 'papupata'\n            export const api = new APIDeclaration()\n            ")),Object(d.d)(i.c,{label:"Simple server configuration"},"\n            import express from 'express'\n            import {api} from './api'\n            const app = express()\n            api.configure({\n              application: app\n            })\n          "),Object(d.d)(c.a,null,"It needs to be verified that the example below works"),Object(d.d)(i.c,{label:"Server with router"},"\n            import express, {Router} from 'express'\n            import {api} from './api'\n            const app = express()\n            const router = new Router()\n            app.use(router)\n            api.configure({\n              router\n            })\n          "),Object(d.d)(i.c,{label:"Configuring browser to use fetch from the local host"},"\n            import {api} from './api'\n            import {fetchAdapter} from 'papupata/dist/main/fetch-adapter'\n            api.configure({\n              baseURL: '',\n              makeRequest: fetchAdapter\n            })\n          "))))}},472:function(e,t,n){"use strict";function r(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  border: 2px dotted transparent;\n  padding: 10px;\n  outline: 5px solid transparent;\n"]);return r=function(){return e},e}n.d(t,"a",(function(){return a}));var a=n(5).a.div(r())},474:function(e,t,n){"use strict";n.d(t,"b",(function(){return P})),n.d(t,"c",(function(){return C})),n.d(t,"d",(function(){return R})),n.d(t,"a",(function(){return k}));n(22);var r=n(433),a=n(1),o=n.n(a),i=n(5),u=n(48),l=n(77),c=n(0);function d(){var e=j([""]);return d=function(){return e},e}function s(){var e=j([""]);return s=function(){return e},e}function p(){var e=j([""]);return p=function(){return e},e}function b(){var e=j([""]);return b=function(){return e},e}function h(){var e=j([""]);return h=function(){return e},e}function f(){var e=j([""]);return f=function(){return e},e}function m(){var e=j([""]);return m=function(){return e},e}function j(e,t){return t||(t=e.slice(0)),e.raw=t,e}var O=i.a.tr(m()),g=i.a.td(f()),v=i.a.td(h()),y=i.a.td(b()),w=i.a.td(p()),x=i.a.td(s()),A=i.a.td(d());function T(e){var t=e.children,n=Object(a.useContext)(I).includeRequiredColumn;if(!n&&t)throw new Error("Being asked to show required cell, yet it does not exist");return n?Object(c.d)(x,null,t):null}var I=Object(a.createContext)({context:"",includeRequiredColumn:!1}),q=function(e){var t=e.name,n=e.children,r=Object(a.useContext)(I).context;return Object(c.d)(g,null,Object(c.d)(u.a,{to:"/api/"+r+"/"+t},n||t))},P=function(e){var t=e.children,n=e.context,a=e.includeRequiredColumn,o=e.includeAvailableFrom;return Object(c.d)(r.j,null,Object(c.d)(I.Provider,{value:{context:n,includeRequiredColumn:!!a}},Object(c.d)(l.a.Provider,{value:!!o},Object(c.d)(r.k,null,"Members"),Object(c.d)("table",null,Object(c.d)("thead",null,Object(c.d)("th",null,"Name"),Object(c.d)("th",null,"Type"),Object(c.d)("th",null,"Data type/return type"),Object(c.d)("th",null,"Description"),a&&Object(c.d)("th",null,"Required"),o&&Object(c.d)("th",null,"Introduced in")),Object(c.d)("tbody",null,t)))))},C=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required,i=e.displayName,u=e.availableFrom,d=o.a.useContext(l.a);return Object(c.d)(O,null,Object(c.d)(q,{name:n},i),Object(c.d)(v,null,"method"),Object(c.d)(y,null,r),Object(c.d)(w,null,t),Object(c.d)(T,null,!0===a?"Yes":!1===a?"No":a),d?Object(c.d)(A,null,u):"")},R=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.required,i=e.availableFrom,u=o.a.useContext(l.a);return Object(c.d)(O,null,Object(c.d)(g,null,n),Object(c.d)(v,null,"property"),Object(c.d)(y,null,r),Object(c.d)(w,null,t),Object(c.d)(T,null,!0===a?"Yes":!1===a?"No":a),u?Object(c.d)(A,null,i):"")},k=function(e){var t=e.children,n=e.name;return Object(c.d)(O,null,Object(c.d)(g,null,n),Object(c.d)(v,null,"property"),Object(c.d)(y,null,"n/a"),Object(c.d)(w,null,t,". Type type itself must be accessed using the typeof operator."))}},475:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));n(1);var r=n(5),a=n(472),o=n(0);function i(){var e=function(e,t){t||(t=e.slice(0));return e.raw=t,e}(["\n  border-color: yellowgreen;\n  background-color: #ffffa7;\n  outline-color: #ffffa7;\n  margin: 20px;\n"]);return i=function(){return e},e}var u=Object(r.a)(a.a)(i()),l=function(e){var t=e.children;return Object(o.d)(u,null,t||"This section needs more work.")}}}]);
//# sourceMappingURL=component---src-pages-api-api-declaration-configure-tsx-bb83f9e92740431851a9.js.map