(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{447:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return c}));var n=t(432),o=t(431),r=t(129),l=t(433),s=t(0);function c(){return Object(s.d)(n.a,null,Object(s.d)(o.a,null,Object(s.d)(r.a,null,Object(s.d)("h1",null,"API Reference"),Object(s.d)("h2",null,"class DeclaredAPI"),Object(s.d)("h3",null,"method getURL")),Object(s.d)(l.i,null,"Get the URL for the API"),Object(s.d)(l.n,null,Object(s.d)("p",null,"This function requires base URL to be configured in order to work."),Object(s.d)("p",null,"As path parameters are considered to be a part of the URL, their values must be provided to the getAPI call and they are injected in to the URL."),Object(s.d)("p",null,"Query parameters are optionally included, too.")),Object(s.d)(l.h,null,Object(s.d)(l.g,{name:"pathAndQueryParams",dataType:"Object"},"Path parameters value for the API, or combination of path and query parameter values.")),Object(s.d)(l.f,null,"string"),Object(s.d)(l.e,null,Object(s.d)(l.c,{label:"Path only"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            api.configure({baseURL: 'https://example.com'})\n            const myAPI = api.declarePostAPI('/do-stuff/:param')\n              .params(['param'] as const)\n              .response<string>()\n\n            const URL = myAPI.getURL({param: 'value'})\n            // URL is now https://example.com/do-stuff/value\n          "),Object(s.d)(l.c,{label:"Path and query (query omitted)"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            api.configure({baseURL: 'https://example.com'})\n            const myAPI = api.declarePostAPI('/do-stuff/:param')\n              .params(['param'] as const)\n              .query(['qval'] as const)\n              .response<string>()\n\n            const URL = myAPI.getURL({param: 'value'})\n            // URL is now https://example.com/do-stuff/value\n          ")," ",Object(s.d)(l.c,{label:"Path and query (query present)"},"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            api.configure({baseURL: 'https://example.com'})\n            const myAPI = api.declarePostAPI('/do-stuff/:param')\n              .params(['param'] as const)\n              .query(['qval'] as const)\n              .response<string>()\n\n            const URL = myAPI.getURL({param: 'value', qval: 'hello'})\n            // URL is now https://example.com/do-stuff/value?qval=hello\n          "))))}}}]);
//# sourceMappingURL=component---src-pages-api-declared-api-get-url-tsx-4e00c0116a8d0b773a98.js.map