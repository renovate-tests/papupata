(window.webpackJsonp=window.webpackJsonp||[]).push([[20,19],{"0JqC":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return a}));var r=t("0Zg6"),l=t("Kg6r"),u=t("qKvR");function a(){return Object(u.d)(r.default,{fnName:"implement",variantPurpose:null,middlewareParameter:null,examples:Object(u.d)(l.c,{label:"Usage in implementation"},"\nmyAPI.implement((req, res) => {\n  const {q} = req.query,\n    {param} = req.params,\n    {key} = req.body\n  res.set('x-my-header', 'Hello')\n  return [param, q, key].join()\n})            \n")})}},"0Zg6":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return i}));var r=t("+ego"),l=t("NqE+"),u=t("TBFr"),a=t("Kg6r"),c=t("qKvR");function i(e){var n=e.availableFrom,t=e.variantPurpose,i=e.middlewareParameter,d=e.fnName,o=e.examples;return Object(c.d)(r.a,null,Object(c.d)(l.a,null,Object(c.d)(u.a,null,Object(c.d)("h1",null,"API Reference"),Object(c.d)("h2",null,"class DeclaredAPI"),Object(c.d)("h3",null,"method ",d)),n&&Object(c.d)(a.a,{version:n}),Object(c.d)(a.i,null,"Implements an API using express. ",t),Object(c.d)(a.n,null,"Instead of calling the methods on an express app or router yourself, you use this function to have papupata do it for you."),Object(c.d)(a.h,null,i,Object(c.d)(a.g,{name:"implementation",dataType:"Function"},"A function that implements the route. Specified as follows",Object(c.d)(a.h,null,Object(c.d)(a.g,{name:"req",dataType:"Request"},"This is a typed express request -- that is, body, params and query have been replaced with typed versions of themselves."),Object(c.d)(a.g,{name:"res",dataType:"Response"},"Express response corresponding to the request.")),Object(c.d)(a.f,null,"ResponseType, ServerResponseType, or a promise of either"),Object(c.d)("ul",null,Object(c.d)("li",null,'Do note that the "next" parameter typically used in routes is not present'),Object(c.d)("li",null,"Anything thrown (includes returned rejected promises) is given to the usual next function"),Object(c.d)("li",null,"If undefined is returned, nothing is sent automatically. This could at times explain hanging requests. Of course, unless you explicitly declared the API to return undefined, you should see type errors, too.")))),Object(c.d)(a.f,null,"Nothing"),Object(c.d)(a.b,null,Object(c.d)("ul",null,Object(c.d)("li",null,"Either application of router must be configured or the function throws"),Object(c.d)("li",null,"You can implement an API multiple times, but it is unlikely to do you any good."),Object(c.d)("li",null,"There is at this time no way to cleanly implement an API that does not just return its value, and instead, say, streams it."))),Object(c.d)(a.e,null,Object(c.d)(a.c,{label:"Declaration"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            const myAPI = api.declarePostAPI('/do-stuff/:param')\n              .params(['param'] as const)\n              .query(['q'] as const)\n              .body({key: string})\n              .response<string>()\n          "),o,Object(c.d)(a.c,{label:"Usage in invocation"},"\n            const response = await myAPI({param: 'abc', q: 'def', key: 'ghi'})            \n            // Response in the example will be abc,def,ghi\n          "))))}},"3KYE":function(e,n,t){"use strict";t.d(n,"a",(function(){return l}));var r=t("q1tI"),l=r.createContext(!1)},Kg6r:function(e,n,t){"use strict";t.d(n,"j",(function(){return v})),t.d(n,"k",(function(){return y})),t.d(n,"i",(function(){return P})),t.d(n,"a",(function(){return w})),t.d(n,"n",(function(){return x})),t.d(n,"h",(function(){return I})),t.d(n,"g",(function(){return A})),t.d(n,"f",(function(){return T})),t.d(n,"b",(function(){return R})),t.d(n,"e",(function(){return k})),t.d(n,"c",(function(){return D})),t.d(n,"d",(function(){return F})),t.d(n,"m",(function(){return K})),t.d(n,"l",(function(){return Y}));t("f3/d");var r=t("vOnD"),l=t("q1tI"),u=t.n(l),a=t("P+0o"),c=t("3KYE"),i=t("qKvR");function d(){var e=h([""]);return d=function(){return e},e}function o(){var e=h([""]);return o=function(){return e},e}function s(){var e=h([""]);return s=function(){return e},e}function b(){var e=h([""]);return b=function(){return e},e}function f(){var e=h([""]);return f=function(){return e},e}function p(){var e=h(["\n  padding: 15px 30px;\n  background: lightyellow;\n"]);return p=function(){return e},e}function j(){var e=h([""]);return j=function(){return e},e}function O(){var e=h([""]);return O=function(){return e},e}function m(){var e=h([""]);return m=function(){return e},e}function h(e,n){return n||(n=e.slice(0)),e.raw=n,e}var v=r.a.section(m()),y=r.a.h4(O()),g=r.a.h5(j()),q=r.a.section(p()),P=function(e){var n=e.children;return Object(i.d)(v,null,Object(i.d)(y,null,"Purpose"),n)},w=function(e){var n=e.version;return Object(i.d)(v,null,Object(i.d)(y,null,"Availability"),"This functionality is available from papupata version ",n," onwards.")},x=function(e){var n=e.children;return Object(i.d)(v,null,Object(i.d)(y,null,"Usage"),n)},I=function(e){var n=e.children,t=e.includeAvailableFrom,r=e.label;return Object(i.d)(v,null,Object(i.d)(c.a.Provider,{value:!!t},Object(i.d)(y,null,"Parameters",r&&": "+r),n?Object(i.d)("table",null,Object(i.d)("thead",null,Object(i.d)("tr",null,Object(i.d)("th",null,"Name"),Object(i.d)("th",null,"Type"),Object(i.d)("th",null,"Description"),t&&Object(i.d)("th",null,"Introduced in"))),Object(i.d)("tbody",null,n)):Object(i.d)("p",null,"There are no parameters.")))},A=function(e){var n=e.children,t=e.name,r=e.dataType,l=e.availableFrom,a=void 0===l?"1.0.0":l,d=u.a.useContext(c.a);return Object(i.d)("tr",null,Object(i.d)("td",null,t),Object(i.d)("td",null,r),Object(i.d)("td",null,n),d&&Object(i.d)("td",null,a))},T=function(e){var n=e.children;return Object(i.d)(v,null,Object(i.d)(y,null,"Returns"),n)},R=function(e){var n=e.children;return Object(i.d)(v,null,Object(i.d)(y,null,"Caveats"),n)},k=function(e){var n=e.children;return Object(i.d)(v,null,Object(i.d)(y,null,"Examples"),n)},D=function(e){var n=e.children,t=e.label;return Object(i.d)(u.a.Fragment,null,t&&Object(i.d)(g,null,t),Object(i.d)(a.a,{language:"typescript"},n))},F=function(e){var n=e.children;return Object(i.d)(q,null,Object(i.d)(g,null,"Common to examples below:"),n)},K=function(e){var n=e.children,t=e.includeAvailableFrom;return Object(i.d)(v,null,Object(i.d)(y,null,"Type parameeters"),Object(i.d)(c.a.Provider,{value:!!t},Object(i.d)(y,null,"Parameters"),n?Object(i.d)("table",null,Object(i.d)("thead",null,Object(i.d)("tr",null,Object(i.d)("th",null,"Name"),Object(i.d)("th",null,"Default value"),Object(i.d)("th",null,"Description"),t?Object(i.d)("th",null,"Introduced in"):"")),Object(i.d)("tbody",null,n)):Object(i.d)("p",null,"There are no parameters.")))},C=r.a.tr(f()),E=r.a.td(b()),N=r.a.td(s()),J=r.a.td(o()),U=r.a.td(d()),Y=function(e){var n=e.children,t=e.name,r=e.defaultValue,l=e.availableFrom,a=void 0===l?"none":l,d=u.a.useContext(c.a);return Object(i.d)(C,null,Object(i.d)(E,null,t),Object(i.d)(N,null,r),Object(i.d)(J,null,n),d?Object(i.d)(U,null,a):"")}}}]);
//# sourceMappingURL=component---src-pages-api-declared-api-implement-tsx-0df0f5335485ac2ca07c.js.map