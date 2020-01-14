(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{434:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return o}));var a=t(432),l=t(431),r=t(129),s=t(433),i=t(0);function o(e){var n=e.withMiddleware;return Object(i.d)(a.a,null,Object(i.d)(l.a,null,Object(i.d)(r.a,null,Object(i.d)("h1",null,"API Reference"),Object(i.d)("h2",null,"class DeclaredAPI"),Object(i.d)("h3",null,"method implement",n&&"WithMiddleware")),Object(i.d)(s.i,null,"Implements an API using express"),Object(i.d)(s.n,null,"Instead of calling the methods on an express app or router yourself, you use this function to have papupata do it for you."),Object(i.d)(s.h,null,n&&Object(i.d)(s.g,{name:"middleware",dataType:"Function[]"},"An array of express middleware functions."),Object(i.d)(s.g,{name:"implementation",dataType:"Function"},"A function that implements the route. Specified as follows",Object(i.d)(s.h,null,Object(i.d)(s.g,{name:"req",dataType:"Request"},"This is a typed express request -- that is, body, params and query have been replaced with typed versions of themselves."),Object(i.d)(s.g,{name:"res",dataType:"Response"},"Express response corresponding to the request.")),Object(i.d)(s.f,null,"ResponseType, ServerResponseType, or a promise of either"),Object(i.d)("ul",null,Object(i.d)("li",null,'Do note that the "next" parameter typically used in routes is not present'),Object(i.d)("li",null,"Anything thrown (includes returned rejected promises) is given to the usual next function"),Object(i.d)("li",null,"If undefined is returned, nothing is sent automatically. This could at times explain hanging requests. Of course, unless you explicitly declared the API to return undefined, you should see type errors, too.")))),Object(i.d)(s.f,null,"Nothing"),Object(i.d)(s.b,null,Object(i.d)("ul",null,Object(i.d)("li",null,"Either application of router must be configured or the function throws"),Object(i.d)("li",null,"You can implement an API multiple times, but it is unlikely to do you any good."),Object(i.d)("li",null,"There is at this time no way to cleanly implement an API that does not just return its value, and instead, say, streams it."))),Object(i.d)(s.e,null,Object(i.d)(s.c,{label:"Declaration"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            const myAPI = api.declarePostAPI('/do-stuff/:param')\n              .params(['param'] as const)\n              .query(['q'] as const)\n              .body({key: string})\n              .response<string>()\n          "),n?Object(i.d)(s.c,{label:"Usage in implementation"},"\n            await myAPI.implementWithMiddleware(\n              [(req, res, next) => { console.log(req.url); next() }],\n              (req, res) => {\n              const {q} = req.query,\n                {param} = req.params,\n                {key} = req.body\n              res.set('x-my-header', 'Hello')\n              return [param, q, key].join()\n            })            \n          "):Object(i.d)(s.c,{label:"Usage in implementation"},"\n            await myAPI.implement((req, res) => {\n              const {q} = req.query,\n                {param} = req.params,\n                {key} = req.body\n              res.set('x-my-header', 'Hello')\n              return [param, q, key].join()\n            })            \n          "),Object(i.d)(s.c,{label:"Usage in invocation"},"\n            const response = await myAPI({param: 'abc', q: 'def', key: 'ghi'})            \n            // Response in the example will be abc,def,ghi\n          "))))}}}]);
//# sourceMappingURL=component---src-pages-api-declared-api-implement-tsx-60338ffdbeb1f2893ccb.js.map