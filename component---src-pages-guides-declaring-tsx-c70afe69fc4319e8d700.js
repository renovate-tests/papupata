(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"3KYE":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("q1tI"),r=a.createContext(!1)},Kg6r:function(e,t,n){"use strict";n.d(t,"j",(function(){return y})),n.d(t,"k",(function(){return g})),n.d(t,"i",(function(){return I})),n.d(t,"a",(function(){return P})),n.d(t,"n",(function(){return w})),n.d(t,"h",(function(){return x})),n.d(t,"g",(function(){return T})),n.d(t,"f",(function(){return q})),n.d(t,"b",(function(){return k})),n.d(t,"e",(function(){return D})),n.d(t,"c",(function(){return F})),n.d(t,"d",(function(){return G})),n.d(t,"m",(function(){return C})),n.d(t,"l",(function(){return E}));var a=n("AcpX"),r=n("vOnD"),l=n("q1tI"),o=n.n(l),i=n("P+0o"),c=n("3KYE"),s=n("qKvR");function u(){var e=Object(a.a)([""]);return u=function(){return e},e}function d(){var e=Object(a.a)([""]);return d=function(){return e},e}function h(){var e=Object(a.a)([""]);return h=function(){return e},e}function p(){var e=Object(a.a)([""]);return p=function(){return e},e}function b(){var e=Object(a.a)([""]);return b=function(){return e},e}function f(){var e=Object(a.a)(["\n  padding: 15px 30px;\n  background: lightyellow;\n"]);return f=function(){return e},e}function j(){var e=Object(a.a)([""]);return j=function(){return e},e}function m(){var e=Object(a.a)([""]);return m=function(){return e},e}function O(){var e=Object(a.a)([""]);return O=function(){return e},e}var y=r.a.section(O()),g=r.a.h4(m()),v=r.a.h5(j()),A=r.a.section(f()),I=function(e){var t=e.children;return Object(s.d)(y,null,Object(s.d)(g,null,"Purpose"),t)},P=function(e){var t=e.version;return Object(s.d)(y,null,Object(s.d)(g,null,"Availability"),"This functionality is available from papupata version ",t," onwards.")},w=function(e){var t=e.children;return Object(s.d)(y,null,Object(s.d)(g,null,"Usage"),t)},x=function(e){var t=e.children,n=e.includeAvailableFrom,a=e.label;return Object(s.d)(y,null,Object(s.d)(c.a.Provider,{value:!!n},Object(s.d)(g,null,"Parameters",a&&": "+a),t?Object(s.d)("table",null,Object(s.d)("thead",null,Object(s.d)("tr",null,Object(s.d)("th",null,"Name"),Object(s.d)("th",null,"Type"),Object(s.d)("th",null,"Description"),n&&Object(s.d)("th",null,"Introduced in"))),Object(s.d)("tbody",null,t)):Object(s.d)("p",null,"There are no parameters.")))},T=function(e){var t=e.children,n=e.name,a=e.dataType,r=e.availableFrom,l=void 0===r?"1.0.0":r,i=o.a.useContext(c.a);return Object(s.d)("tr",null,Object(s.d)("td",null,n),Object(s.d)("td",null,a),Object(s.d)("td",null,t),i&&Object(s.d)("td",null,l))},q=function(e){var t=e.children;return Object(s.d)(y,null,Object(s.d)(g,null,"Returns"),t)},k=function(e){var t=e.children;return Object(s.d)(y,null,Object(s.d)(g,null,"Caveats"),t)},D=function(e){var t=e.children;return Object(s.d)(y,null,Object(s.d)(g,null,"Examples"),t)},F=function(e){var t=e.children,n=e.label;return Object(s.d)(o.a.Fragment,null,n&&Object(s.d)(v,null,n),Object(s.d)(i.a,{language:"typescript"},t))},G=function(e){var t=e.children;return Object(s.d)(A,null,Object(s.d)(v,null,"Common to examples below:"),t)},C=function(e){var t=e.children,n=e.includeAvailableFrom;return Object(s.d)(y,null,Object(s.d)(g,null,"Type parameeters"),Object(s.d)(c.a.Provider,{value:!!n},Object(s.d)(g,null,"Parameters"),t?Object(s.d)("table",null,Object(s.d)("thead",null,Object(s.d)("tr",null,Object(s.d)("th",null,"Name"),Object(s.d)("th",null,"Default value"),Object(s.d)("th",null,"Description"),n?Object(s.d)("th",null,"Introduced in"):"")),Object(s.d)("tbody",null,t)):Object(s.d)("p",null,"There are no parameters.")))},R=r.a.tr(b()),K=r.a.td(p()),L=r.a.td(h()),S=r.a.td(d()),Y=r.a.td(u()),E=function(e){var t=e.children,n=e.name,a=e.defaultValue,r=e.availableFrom,l=void 0===r?"none":r,i=o.a.useContext(c.a);return Object(s.d)(R,null,Object(s.d)(K,null,n),Object(s.d)(L,null,a),Object(s.d)(S,null,t),i?Object(s.d)(Y,null,l):"")}},ZdCH:function(e,t,n){"use strict";n.r(t);var a=n("AcpX"),r=n("q1tI"),l=n("NqE+"),o=n("TBFr"),i=n("+ego"),c=n("jqoI"),s=n("Kg6r"),u=n("vOnD"),d=n("Wbzz"),h=n("qKvR");function p(){var e=Object(a.a)(["\n  border-left: 3px solid #eee;\n  padding-left: 30px;\n  margin-bottom: 30px;\n"]);return p=function(){return e},e}var b=u.a.div(p());t.default=function(){return Object(h.d)(i.a,null,Object(h.d)(l.a,null,Object(h.d)(o.a,null,Object(h.d)("h1",null,"Guide: declaring APIs"),Object(h.d)(c.c,null,"Papupata is all about implementing and invoking APIs. In order for any of that to happen, the APIs must first be declared, or modeled using the tools provided by papupata. This guide covers how the declarations are made."),Object(h.d)(c.b,{content:[{heading:"Setting up an API declaration",anchor:"setup",content:Object(h.d)(r.Fragment,null,Object(h.d)("p",null,"The first thing you'll need is an API declaration. Simply put, it typically represents a set of APIs accessible from a single host. It could be all of the APIs of an application, or just one of them."),Object(h.d)("p",null,"In order to actually use the declared APIs, it is necessary to set up configuration, but just for the purposes of declaring APIs we do not have to worry about that."),Object(h.d)(s.c,null,"\n              import {APIDeclaration} from 'papupata'\n              const API = new APIDeclaration()\n              "),Object(h.d)("p",null,"All of the examples in the sections below will expect this API declaration to exist in their scope."))},{heading:"Your first declaration",anchor:"first",content:Object(h.d)(r.Fragment,null,Object(h.d)("p",null,"Let's start with a really simple API. An API found at ",Object(h.d)(c.a,null,"/hello"),", invoked with the HTTP method"," ",Object(h.d)(c.a,null,"GET"),", which a string as its response."),Object(h.d)(s.c,null,"\n                    const helloAPI = API\n                      .declareGetAPI('/hello')\n                      .response<string>()\n                  "),Object(h.d)("p",null,"Seems simple, enough, right? We specify the method and the path by invoking the ",Object(h.d)(c.a,null,"declareGetAPI")," ","function on the API declaration, and then we declare the response type with the ",Object(h.d)(c.a,null,"response")," method."),Object(h.d)("p",null,"Bodies and responses are often complicated objects, and as such they are represented using typescript types. As we see in the example, the type of the response is passed to the ",Object(h.d)(c.a,null,"response")," function as an explicit type parameter."))},{heading:"The anatomy of a declaration",anchor:"anatomy",content:Object(h.d)(r.Fragment,null,Object(h.d)("p",null,"API declarations often contain many things, and many of those can be modeled using papupata."),Object(h.d)("p",null,"Let's start by looking at an API declaration which utilizes all of the possibilities provided by papupata"),Object(h.d)(s.c,null,"\n                const complexAPI = API.declarePostAPI('/update/:id', routeOptions)\n                  .params(['id'] as const)\n                  .query(['author'] as const)\n                  .optionalQuery(['timestamp'] as const)\n                  .queryBool(['notifyWatchers'] as const)\n                  .body<string, Date>()\n                  .response<string, Date>()\n                "),Object(h.d)("p",null,"Having easy-to-read API declarations was one of the main goals of papupata, and hopefully we've been reasonably successful. It is rare to see everything present in the example in real APIs, so it is something of an abomination."),Object(h.d)("p",null,"Anyway, let's briefly go through each part"),Object(h.d)(b,null,Object(h.d)(s.c,null,"const complexAPI"),Object(h.d)("p",null,"You need to store APIs somewhere. Although you declare them on the API declaration object, you can not access them from there -- and you'd never be able to get the type safety if you could."),Object(h.d)("p",null,"For simple cases you can store the APIs in simple variables, but if you are modeling a collection of APIs, it probably makes sense to store the APIs in an object:"),Object(h.d)(s.c,null,"\n                      const apis = {\n                        getOne: API.declareGetAPI(...),\n                        updateOne: API.declareGetAPI(...),\n                        deleteOne: API.declareGetAPI(...),\n                        find: API.declareGetAPI(...),\n                      }\n                    "),Object(h.d)("p",null,"You can even nest objects to make a logical hierarchy out of them.")),Object(h.d)(b,null,Object(h.d)(s.c,null,".declarePostAPI("),Object(h.d)("p",null,"All APIs are declared using one of the methods on an API declaration instance. The naming pattern is always the same, so you can expect to find declareGetAPI, declarePutAPI and so on to be available."),Object(h.d)("p",null,"At this time there is no way to define an API to support multiple methods -- you have do declare it separately for each method.")),Object(h.d)(b,null,Object(h.d)(s.c,null,"'/update/:id'"),Object(h.d)("p",null,"All APIs are declared using relative paths. The base URL is set up before calls can be made, and it can even include paths as well."),Object(h.d)("p",null,"Path parameters must be present in the url passed to the declaration function; they are indicated by a colon before the parameter name."),Object(h.d)("p",null,"Query parameters are generally speaking NOT included in the url, however you can include query-based rules in the path when APIs only differ from each other by their query parameters. See"," ",Object(h.d)(d.a,{to:"/guides/declaring/query-based-variants"},"Query-based variants")," for more information.")),Object(h.d)(b,null,Object(h.d)(s.c,null,", routeOptions)"),Object(h.d)("p",null,"Sometimes you need to add metadata to the routes. It could be relevant for the client, server, or both."),Object(h.d)("p",null,"The API declaration has a number of type parameters, one of which is used to define the type of the route options."),Object(h.d)("p",null,"These parameters are typically accessed either from the middleware or the function that actually makes HTTP requests."),Object(h.d)("p",null,"A common use case would be to indicate the need for authentication. This allows the server to verify authentication as needed, while the client can skip obtaining the credentials."),Object(h.d)("p",null,"As the example API declaration does not include options, here is another small example:"),Object(h.d)(s.c,null,"\n                      import {Request} from 'express'\n                      const API = new APIDeclaration<Request, {requiresAuthentication: boolean}>\n                      const api = API.declareGetAPI('/', {requiresAuthentication: false})\n                    ")),Object(h.d)(b,null,Object(h.d)(s.c,null,".params(['id'] as const)"),Object(h.d)("p",null,"In addition to being declared in the URL, path parameters need to be declared in a way that lets typescript know they exist. This call to params serves that purpose."),Object(h.d)("p",null,"Just add all the parameters into an array (omitting the leading colon used in the URL), and add"," ",Object(h.d)(c.a,null,"as const")," after the array."),Object(h.d)("p",null,"At this time path parameters cannot be optional; if you need to support that case, you have to declare multiple APIs that match the different cases."),Object(h.d)("p",null,"Knowing or understanging ",Object(h.d)(c.a,null,"as const")," is not necessary to use papupata, but in case you are interested, causes the array not to be just an array of strings. In the example case, it is a tuple where the first element is ",Object(h.d)(c.a,null,"id"),". From this it is possible to extract the type needed both for implementing and calling the API.")),Object(h.d)(b,null,Object(h.d)(s.c,null,"\n                    .query(['author'] as const)\n                    .optionalQuery(['timestamp'] as const)\n                    .queryBool(['notifyWatchers'] as const)\n                    "),Object(h.d)("p",null,"The format for entering query parameters is the same as with path parameters. There are, however, 3 different types of query parameters; normal, optional and boolean."),Object(h.d)("p",null,"You can have any combination of the 3 in any given API, but they must always be declared in that order."),Object(h.d)("p",null,Object(h.d)(c.a,null,"query")," and ",Object(h.d)(c.a,null,"optionalQuery")," should hopefully be obvious,"," ",Object(h.d)(c.a,null,"queryBool")," is a convenience option; when calling it expects a boolean value instead of a string. On the implementation side, the value ",Object(h.d)(c.a,null,"true")," becomes the boolean true, any other value becomes false.")),Object(h.d)(b,null,Object(h.d)(s.c,null,".body<string, Date>()"),Object(h.d)("p",null,"Oh boy. Let's start with something a little simpler: ",Object(h.d)(c.a,null,".body<string>()"),". That is what you'll usually see, and should be quite straightforward. The body for the request must be a string."),Object(h.d)("p",null,"I can be any type, but in practice the transport medium (commonly json) does tend to put limitations to what can really be transferred. Functions, for example, you probably can't just pass along over APIs."),Object(h.d)("p",null,"Sometimes there are types which are transformed automatically. When using JSON, dates for example are commonly just stored as a string, even if you original payload had it as a date. This creates a typing conundrum: surely you should be able to pass in a date, even if the other side will see it as a string. This is where the second type parameter comes in. The first parameter is the type of the body, as it will be seen by the server, and the second one is the type of the body the way the client application can pass it. The conversion between the two should be transparent to the user. If you only pass one type parameter, it is used for both cases.")),Object(h.d)(b,null,Object(h.d)(s.c,null,".response<string, Date>()"),Object(h.d)("p",null,"Response work just like body does, except from the opposite point of view."),Object(h.d)("p",null,"You can pass a single type argument and it'll be the type of there response everywhere. If you pass another one though, that is what the implementation is expected to return. Again, the conversion to the type seen by the client should be implicit, either built into the serialization process or maybe in the form of a middleware."),Object(h.d)("p",null,"All declarations must end with a response. The type can be void or undefined if the API returns nothing, but the call to ",Object(h.d)(c.a,null,"response")," must be there regardless.")))},{heading:"Error handling",anchor:"errors",content:Object(h.d)(r.Fragment,null,Object(h.d)("p",null,"At this time papupata does not have particular support for managing errors."),Object(h.d)("p",null,"You could type the response to be either the actual response or an error response, but that's essentially the extent of it."),Object(h.d)(s.c,null,"\n                const api = API.declareGetAPI('/path')\n                  .response<Data | {errorMessage: string}>()\n                "),Object(h.d)("p",null,"Even so, there are certainly limitations to this. If the client request library rejects the failed requests, the type information will be lost anyway and even in success cases you have to ensure you got the data object even if it should be obvious."),Object(h.d)("p",null,"This is certainly something that will be developed further in upcoming releases."))},{heading:"Conclusion",anchor:"conclusion",content:Object(h.d)(r.Fragment,null,Object(h.d)("p",null,"What we've covered includes essentially everything papupata has for declaring the APIs."),Object(h.d)("p",null,"The logical next steps would be about how to actually use the declarations. If you want to call the declared APIs, head on over to ",Object(h.d)(d.a,{to:"/guides/client/setup"},"setting up papupata client"),", or perhaps straight to"," ",Object(h.d)(d.a,{to:"/guides/client/calling"},"calling APIs")," if someone else has set things up for you already."),Object(h.d)("p",null,"On the other hand, if you want to implement APIs that have been declared,"," ",Object(h.d)(d.a,{to:"/guides/server/setup"},"setting up papupata server")," and"," ",Object(h.d)(d.a,{to:"/guides/server/implementing"},"implementing APIs")," are good next guides."),Object(h.d)("p",null,"Lastly, if you want to know about how to extract metadata from the declared APIs, there is a guide about"," ",Object(h.d)(d.a,{to:"/guides/metadata"},"metadata"),", too."))}]}))))}},jqoI:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return b}));var a=n("AcpX"),r=(n("q1tI"),n("Kg6r")),l=n("vOnD"),o=n("qKvR");function i(){var e=Object(a.a)(['\n  font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace\n']);return i=function(){return e},e}function c(){var e=Object(a.a)(["\n  font-size: 1.1em;\n"]);return c=function(){return e},e}function s(){var e=Object(a.a)([""]);return s=function(){return e},e}function u(e){var t=e.children;return Object(o.d)(r.j,null,Object(o.d)(r.k,null,"Overview"),t)}var d=l.a.h4(s()),h=l.a.h5(c());function p(e){var t=e.content;return Object(o.d)("div",null,Object(o.d)(r.j,null,Object(o.d)(r.k,null,"Table of contents"),Object(o.d)("ul",null,t.map((function(e){return Object(o.d)("li",{style:{marginLeft:18*(e.level||0)},key:e.anchor},Object(o.d)("a",{href:"#"+e.anchor},e.heading))})))),t.map((function(e){var t=e.level?h:d;return Object(o.d)(r.j,{id:e.anchor,key:e.anchor},Object(o.d)(t,null,e.heading),e.content)})))}var b=l.a.span(i())}}]);
//# sourceMappingURL=component---src-pages-guides-declaring-tsx-c70afe69fc4319e8d700.js.map