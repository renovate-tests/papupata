(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"3KYE":function(n,e,t){"use strict";t.d(e,"a",(function(){return u}));var r=t("q1tI"),u=r.createContext(!1)},JiHL:function(n,e,t){"use strict";t.r(e),t.d(e,"default",(function(){return d}));var r=t("+ego"),u=t("NqE+"),l=t("TBFr"),c=t("Kg6r"),a=t("qKvR");function d(){return Object(a.d)(r.a,null,Object(a.d)(u.a,null,Object(a.d)(l.a,null,Object(a.d)("h1",null,"API Reference"),Object(a.d)("h2",null,"class DeclaredAPI"),Object(a.d)("h3",null,"exposed type ResponseType")),Object(a.d)(c.i,null,"Represents the type returned from the API."),Object(a.d)(c.n,null,Object(a.d)("p",null,"The exposed types are used with the typeof operator. See the example below for details."),Object(a.d)("p",null,"Although the types are presented as fields on the API, they have no runtime value.")),Object(a.d)(c.e,null,Object(a.d)(c.c,null,"\n            import { APIDeclaration } from 'papupata'\n            const api = new APIDeclaration()\n            const myAPI = api.declarePostAPI('/do-stuff')\n              .response<string>()\n\n            type ResponseType = typeof myAPI['ResponseType']\n            // ResponseType is now string\n          "))))}},Kg6r:function(n,e,t){"use strict";t.d(e,"j",(function(){return m})),t.d(e,"k",(function(){return y})),t.d(e,"i",(function(){return A})),t.d(e,"a",(function(){return w})),t.d(e,"n",(function(){return I})),t.d(e,"h",(function(){return T})),t.d(e,"g",(function(){return x})),t.d(e,"f",(function(){return R})),t.d(e,"b",(function(){return D})),t.d(e,"e",(function(){return F})),t.d(e,"c",(function(){return K})),t.d(e,"d",(function(){return q})),t.d(e,"m",(function(){return C})),t.d(e,"l",(function(){return B}));var r=t("AcpX"),u=t("vOnD"),l=t("q1tI"),c=t.n(l),a=t("P+0o"),d=t("3KYE"),o=t("qKvR");function i(){var n=Object(r.a)([""]);return i=function(){return n},n}function b(){var n=Object(r.a)([""]);return b=function(){return n},n}function j(){var n=Object(r.a)([""]);return j=function(){return n},n}function O(){var n=Object(r.a)([""]);return O=function(){return n},n}function f(){var n=Object(r.a)([""]);return f=function(){return n},n}function s(){var n=Object(r.a)(["\n  padding: 15px 30px;\n  background: lightyellow;\n"]);return s=function(){return n},n}function p(){var n=Object(r.a)([""]);return p=function(){return n},n}function v(){var n=Object(r.a)([""]);return v=function(){return n},n}function h(){var n=Object(r.a)([""]);return h=function(){return n},n}var m=u.a.section(h()),y=u.a.h4(v()),P=u.a.h5(p()),g=u.a.section(s()),A=function(n){var e=n.children;return Object(o.d)(m,null,Object(o.d)(y,null,"Purpose"),e)},w=function(n){var e=n.version;return Object(o.d)(m,null,Object(o.d)(y,null,"Availability"),"This functionality is available from papupata version ",e," onwards.")},I=function(n){var e=n.children;return Object(o.d)(m,null,Object(o.d)(y,null,"Usage"),e)},T=function(n){var e=n.children,t=n.includeAvailableFrom,r=n.label;return Object(o.d)(m,null,Object(o.d)(d.a.Provider,{value:!!t},Object(o.d)(y,null,"Parameters",r&&": "+r),e?Object(o.d)("table",null,Object(o.d)("thead",null,Object(o.d)("tr",null,Object(o.d)("th",null,"Name"),Object(o.d)("th",null,"Type"),Object(o.d)("th",null,"Description"),t&&Object(o.d)("th",null,"Introduced in"))),Object(o.d)("tbody",null,e)):Object(o.d)("p",null,"There are no parameters.")))},x=function(n){var e=n.children,t=n.name,r=n.dataType,u=n.availableFrom,l=void 0===u?"1.0.0":u,a=c.a.useContext(d.a);return Object(o.d)("tr",null,Object(o.d)("td",null,t),Object(o.d)("td",null,r),Object(o.d)("td",null,e),a&&Object(o.d)("td",null,l))},R=function(n){var e=n.children;return Object(o.d)(m,null,Object(o.d)(y,null,"Returns"),e)},D=function(n){var e=n.children;return Object(o.d)(m,null,Object(o.d)(y,null,"Caveats"),e)},F=function(n){var e=n.children;return Object(o.d)(m,null,Object(o.d)(y,null,"Examples"),e)},K=function(n){var e=n.children,t=n.label;return Object(o.d)(c.a.Fragment,null,t&&Object(o.d)(P,null,t),Object(o.d)(a.a,{language:"typescript"},e))},q=function(n){var e=n.children;return Object(o.d)(g,null,Object(o.d)(P,null,"Common to examples below:"),e)},C=function(n){var e=n.children,t=n.includeAvailableFrom;return Object(o.d)(m,null,Object(o.d)(y,null,"Type parameeters"),Object(o.d)(d.a.Provider,{value:!!t},Object(o.d)(y,null,"Parameters"),e?Object(o.d)("table",null,Object(o.d)("thead",null,Object(o.d)("tr",null,Object(o.d)("th",null,"Name"),Object(o.d)("th",null,"Default value"),Object(o.d)("th",null,"Description"),t?Object(o.d)("th",null,"Introduced in"):"")),Object(o.d)("tbody",null,e)):Object(o.d)("p",null,"There are no parameters.")))},k=u.a.tr(f()),E=u.a.td(O()),J=u.a.td(j()),N=u.a.td(b()),Y=u.a.td(i()),B=function(n){var e=n.children,t=n.name,r=n.defaultValue,u=n.availableFrom,l=void 0===u?"none":u,a=c.a.useContext(d.a);return Object(o.d)(k,null,Object(o.d)(E,null,t),Object(o.d)(J,null,r),Object(o.d)(N,null,e),a?Object(o.d)(Y,null,l):"")}}}]);
//# sourceMappingURL=component---src-pages-api-declared-api-response-type-tsx-7c26692d0b38563e2b0a.js.map