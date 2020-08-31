(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{"3KYE":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("q1tI"),a=r.createContext(!1)},Kg6r:function(e,t,n){"use strict";n.d(t,"j",(function(){return g})),n.d(t,"k",(function(){return v})),n.d(t,"i",(function(){return y})),n.d(t,"a",(function(){return A})),n.d(t,"n",(function(){return P})),n.d(t,"h",(function(){return k})),n.d(t,"g",(function(){return x})),n.d(t,"f",(function(){return T})),n.d(t,"b",(function(){return q})),n.d(t,"e",(function(){return R})),n.d(t,"c",(function(){return C})),n.d(t,"d",(function(){return F})),n.d(t,"m",(function(){return D})),n.d(t,"l",(function(){return B}));var r=n("AcpX"),a=n("vOnD"),i=n("q1tI"),l=n.n(i),o=n("P+0o"),u=n("3KYE"),c=n("qKvR");function s(){var e=Object(r.a)([""]);return s=function(){return e},e}function d(){var e=Object(r.a)([""]);return d=function(){return e},e}function p(){var e=Object(r.a)([""]);return p=function(){return e},e}function h(){var e=Object(r.a)([""]);return h=function(){return e},e}function b(){var e=Object(r.a)([""]);return b=function(){return e},e}function m(){var e=Object(r.a)(["\n  padding: 15px 30px;\n  background: lightyellow;\n"]);return m=function(){return e},e}function f(){var e=Object(r.a)([""]);return f=function(){return e},e}function j(){var e=Object(r.a)([""]);return j=function(){return e},e}function O(){var e=Object(r.a)([""]);return O=function(){return e},e}var g=a.a.section(O()),v=a.a.h4(j()),w=a.a.h5(f()),I=a.a.section(m()),y=function(e){var t=e.children;return Object(c.d)(g,null,Object(c.d)(v,null,"Purpose"),t)},A=function(e){var t=e.version;return Object(c.d)(g,null,Object(c.d)(v,null,"Availability"),"This functionality is available from papupata version ",t," onwards.")},P=function(e){var t=e.children;return Object(c.d)(g,null,Object(c.d)(v,null,"Usage"),t)},k=function(e){var t=e.children,n=e.includeAvailableFrom,r=e.label;return Object(c.d)(g,null,Object(c.d)(u.a.Provider,{value:!!n},Object(c.d)(v,null,"Parameters",r&&": "+r),t?Object(c.d)("table",null,Object(c.d)("thead",null,Object(c.d)("tr",null,Object(c.d)("th",null,"Name"),Object(c.d)("th",null,"Type"),Object(c.d)("th",null,"Description"),n&&Object(c.d)("th",null,"Introduced in"))),Object(c.d)("tbody",null,t)):Object(c.d)("p",null,"There are no parameters.")))},x=function(e){var t=e.children,n=e.name,r=e.dataType,a=e.availableFrom,i=void 0===a?"1.0.0":a,o=l.a.useContext(u.a);return Object(c.d)("tr",null,Object(c.d)("td",null,n),Object(c.d)("td",null,r),Object(c.d)("td",null,t),o&&Object(c.d)("td",null,i))},T=function(e){var t=e.children;return Object(c.d)(g,null,Object(c.d)(v,null,"Returns"),t)},q=function(e){var t=e.children;return Object(c.d)(g,null,Object(c.d)(v,null,"Caveats"),t)},R=function(e){var t=e.children;return Object(c.d)(g,null,Object(c.d)(v,null,"Examples"),t)},C=function(e){var t=e.children,n=e.label;return Object(c.d)(l.a.Fragment,null,n&&Object(c.d)(w,null,n),Object(c.d)(o.a,{language:"typescript"},t))},F=function(e){var t=e.children;return Object(c.d)(I,null,Object(c.d)(w,null,"Common to examples below:"),t)},D=function(e){var t=e.children,n=e.includeAvailableFrom;return Object(c.d)(g,null,Object(c.d)(v,null,"Type parameeters"),Object(c.d)(u.a.Provider,{value:!!n},Object(c.d)(v,null,"Parameters"),t?Object(c.d)("table",null,Object(c.d)("thead",null,Object(c.d)("tr",null,Object(c.d)("th",null,"Name"),Object(c.d)("th",null,"Default value"),Object(c.d)("th",null,"Description"),n?Object(c.d)("th",null,"Introduced in"):"")),Object(c.d)("tbody",null,t)):Object(c.d)("p",null,"There are no parameters.")))},M=a.a.tr(b()),U=a.a.td(h()),K=a.a.td(p()),N=a.a.td(d()),E=a.a.td(s()),B=function(e){var t=e.children,n=e.name,r=e.defaultValue,a=e.availableFrom,i=void 0===a?"none":a,o=l.a.useContext(u.a);return Object(c.d)(M,null,Object(c.d)(U,null,n),Object(c.d)(K,null,r),Object(c.d)(N,null,t),o?Object(c.d)(E,null,i):"")}},R9EA:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("NqE+"),i=n("TBFr"),l=n("+ego"),o=n("jqoI"),u=n("Kg6r"),c=n("Wbzz"),s=n("qKvR");t.default=function(){return Object(s.d)(l.a,null,Object(s.d)(a.a,null,Object(s.d)(i.a,null,Object(s.d)("h1",null,"Guide: setting up papupata for servers"),Object(s.d)(o.c,null,"In order to start implementing APIs on the server you need to configure papupata to let it know about its environment. This guide covers the most common cases and gives pointer for less common ones."),Object(s.d)(o.b,{content:[{heading:"Prerequisites",anchor:"prerequisites",content:Object(s.d)(r.Fragment,null,Object(s.d)("p",null,"Before starting this guide, should know a little bit about API declarations. See"," ",Object(s.d)(c.a,{to:"/guides/declaring"},"Declaring APIs")," for more details."))},{heading:"The Basics",anchor:"basics",content:Object(s.d)(r.Fragment,null,Object(s.d)("p",null,"The one thing that is absolutely essential for implementing APIs, is providing papupata with either an express application or router, which it will declare its routes on."),Object(s.d)("p",null,"The configuration itself takes place using the ",Object(s.d)(o.a,null,"configure")," method of an API declaration."),Object(s.d)(u.c,null,"\n                    import express, {Router} from 'express'\n                    const app = express()\n                    const API = new APIDeclaration()\n                    API.configure({\n                      app\n                    })\n                  "),Object(s.d)(u.c,null,"\n                    const router = Router()\n                    app.use(router)\n                    API.configure({\n                      router\n                    })\n                  "))},{heading:"Automatic route implementation",anchor:"automatic",content:Object(s.d)(r.Fragment,null,Object(s.d)(u.c,null,"\n                  API.configure({\n                    ...API.getConfig(),\n                    autoImplementAllAPIs: true\n                  })\n                  "),Object(s.d)("p",null,"If you are going to implement all, or at least the vast majority of the APIs that have been declared using papupata with papupata, it makes sense to have papupata automatically set up all routes to return 501 Not Implemented until the routes are actually implemented."),Object(s.d)("p",null,"This makes it obvious what is wrong if you try to invoke such an API. There is a more important effect to this as well, as it means that routes are implemented in the order they were declared in, rather than the order they are implemented in. Usually this does not make a difference, but sometimes the routing can be ambiguous, with the order being the deciding factor. Consider this example:"),Object(s.d)(u.c,null,"\n                    const api1 = API.declareGetAPI('/entries/all').response<any>()\n                    const api2 = API.declareGetAPI('/entries/:id').params(['id'] as const).response<any>()\n                  "),Object(s.d)("p",null,"It's quite obvious reading it that the intent is that /entries/all goes to api1, and, say, /entries/123 goes to api2. There is however nothing that inherently says that /entries/all shouldn't be handled by api2. Unless the"," ",Object(s.d)(o.a,null,"autoImplementAllAPIs")," setting is set to true, then you'd have to make sure that implementing api1 takes place before api2 is implemented. With the setting set to true though, it is enough for api1 to be declared before api2, as is the case in the example."),Object(s.d)("p",null,"With this setting enabled it is still possible for individual routes to fall back to regular express routing, allowing the implementation to be done in other ways. This is done by having the implementation or a middleware leading to it return ",Object(s.d)(o.a,null,"papupata.skipHandlingRoute")),Object(s.d)(u.c,null,"\n                    import {skipHandlingRoute} from 'papupata'\n                    api1.implement(() => skipHandlingRoute)\n                  "))},{heading:"Base URL",anchor:"baseURL",content:Object(s.d)(r.Fragment,null,Object(s.d)(u.c,null,"\n                  API.configure({\n                    ...API.getConfig(),\n                    baseURL: 'https://www.example.com'\n                  })\n                  "),Object(s.d)("p",null,"Setting up the base url is essential for clients, but it can be useful for servers as well. With a base url set up, you can call the ",Object(s.d)(o.a,null,"getURL")," method on the declarations, which can be useful for redirections, callback urls etc."),Object(s.d)("p",null,"Just for the purpose of implementing routes it is unnecessary."))},{heading:"Non-root routers",anchor:"nonroot",content:Object(s.d)(r.Fragment,null,Object(s.d)(u.c,null,"\n                  API.configure({\n                    ...API.getConfig(),\n                    routerAt: '/api'\n                  })\n                  "),Object(s.d)("p",null,"You might find it convenient to set up papupata implementation on an express router that is not at the root of the server. As a common example, you might want to set up the router to be under /api so that its middleware is only applied to API calls."),Object(s.d)("p",null,"This is a supported scenario -- all you have to do is add the ",Object(s.d)(o.a,null,"routerAt")," option to the configuration to tell papupata where the router is mounted at."),Object(s.d)("p",null,"All of the APIs in the declaration to be within the router path -- you cannot have routes at paths where they cannot be implemented"),Object(s.d)(u.c,null,"\n                  import express, {Router} from 'express'\n                  import {APIDeclaration} from 'papupata'\n\n                  const API = new APIDeclaration()\n                  const getOne = API.declareGetAPI('/api/getOne').response<any>()\n                  const app = express()\n                  const router = Router()\n                  router.use(authenticationMiddleware)\n                  app.use('/api', router)\n\n                  API.configure({\n                    router,\n                    routerAt: '/api'\n                  })\n                  "))},{heading:"Middleware",anchor:"middleware",content:Object(s.d)(r.Fragment,null,Object(s.d)(u.c,null,"\n                  API.configure({\n                    ...API.getConfig(),\n                    inherentMiddleware: [myMiddleware1, myMiddleware2]\n                  })\n                  "),Object(s.d)("p",null,"Papupata supports middleware, which can be used on the server to process both requests and responses. For more details see ",Object(s.d)(c.a,{to:"/guides/server/middleware"},"the middleware guide"),"."),Object(s.d)("p",null,"Papupata comes with one built-in middleware that changes how undefined responses are handled. Currently an implementation returning undefined is taken as an indication that it takes full responsibility for handling the response."),Object(s.d)("p",null,"In practice though, a more likely scenario is that the API has nothing to return, and having returning undefined result in HTTP 204 (no content) would be better. And that is exactly what the middleware does."),Object(s.d)("p",null,"Here's an overview of what it actually does:"),Object(s.d)("ul",null,Object(s.d)("li",null,"If headers have already been sent, it does nothing (this still lets you have APIs that take care of the whole response on their own)"),Object(s.d)("li",null,"If status was not explicitly set, it sets it to 204"),Object(s.d)("li",null,"It sends a response to the client with no data")),Object(s.d)(u.c,null,"\n                    import {handleUndefinedResponsesMiddleware} from 'papupata'\n                    API.configure({\n                      ...API.getConfig(),\n                      inherentMiddleware: [handleUndefinedResponsesMiddleware]\n                    })\n\n                    api1.implement(() => {}) // results in a 204 response\n                    api2.implement((_req, res) => {res.redirect('/')}) // the redirection works as expected\n                    api3.implement((_req, res) => {res.status(400)}) // status 400, response is sent with no data\n                    api4.implement((_req, res) => {res.send('done')}) // nothing special happens\n                  "))},{heading:"Conclusion",anchor:"conclusion",content:Object(s.d)(r.Fragment,null,Object(s.d)("p",null,"Now that papupata is set up to respond to requests, the next step should be actually implementing the APIs."),Object(s.d)("p",null,"See ",Object(s.d)(c.a,{to:"/guides/server/implementing"},"implementing APIs")," for how to do exactly that."),Object(s.d)("p",null,"If you are concerned with how papupata interacts with your existing express APIs and middleware, you could also take a look at ",Object(s.d)(c.a,{to:"/guides/server/interactingWithExpress"},"Interacting with express"),"."))}]}))))}},jqoI:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return h})),n.d(t,"a",(function(){return b}));var r=n("AcpX"),a=(n("q1tI"),n("Kg6r")),i=n("vOnD"),l=n("qKvR");function o(){var e=Object(r.a)(['\n  font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace\n']);return o=function(){return e},e}function u(){var e=Object(r.a)(["\n  font-size: 1.1em;\n"]);return u=function(){return e},e}function c(){var e=Object(r.a)([""]);return c=function(){return e},e}function s(e){var t=e.children;return Object(l.d)(a.j,null,Object(l.d)(a.k,null,"Overview"),t)}var d=i.a.h4(c()),p=i.a.h5(u());function h(e){var t=e.content;return Object(l.d)("div",null,Object(l.d)(a.j,null,Object(l.d)(a.k,null,"Table of contents"),Object(l.d)("ul",null,t.map((function(e){return Object(l.d)("li",{style:{marginLeft:18*(e.level||0)},key:e.anchor},Object(l.d)("a",{href:"#"+e.anchor},e.heading))})))),t.map((function(e){var t=e.level?p:d;return Object(l.d)(a.j,{id:e.anchor,key:e.anchor},Object(l.d)(t,null,e.heading),e.content)})))}var b=i.a.span(o())}}]);
//# sourceMappingURL=component---src-pages-guides-server-setup-tsx-0f18f5ba86315e3d7159.js.map