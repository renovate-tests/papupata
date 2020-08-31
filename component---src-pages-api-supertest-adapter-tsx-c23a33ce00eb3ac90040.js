(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{482:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return l}));a(1);var p=a(434),n=a(130),r=a(435),u=a(436),s=a(0);function l(){return Object(s.d)(u.a,null,Object(s.d)(r.a,null,Object(s.d)(n.a,null,Object(s.d)("h1",null,"API Reference"),Object(s.d)("h2",null,"module supertestAdapter"),Object(s.d)("h3",null,"Default export createSupertestAdapter")),Object(s.d)(p.i,null,"This module allows you to use supertest to make papupata API requests."),Object(s.d)(p.a,{version:"1.5.0"}),Object(s.d)(p.n,null,Object(s.d)(p.c,null,"\n            import createSupertestAdapter from 'papupata/dist/main/supertestAdapter'\n          "),Object(s.d)("p",null,"To begin with, you'll want to set up a supertest request for your express application. Once done, you can create a supertest papupata adapter to start making API calls."),Object(s.d)("p",null,"Do note that you'll almost certainly want to configure papupata with a blank base URL to make things work.")),Object(s.d)(p.h,null,Object(s.d)(p.g,{name:"supertestRequest",dataType:"Supertest request"},"Supertest request")),Object(s.d)(p.f,null,"Papupata MakeRequestAdapter"),Object(s.d)(p.e,null,Object(s.d)(p.c,null,"\n            import { APIDeclaration } from 'papupata'\n            import createSupertestAdapter from 'papupata/dist/main/supertestAdapter' \n            import express from 'express'\n            import supertest from 'supertest'\n            \n            const app = express()\n            const request = supertest(app)\n            const API = new APIDeclaration()\n            API.configure({\n              app,\n              baseURL: '',\n              makeRequest: createSupertestAdapter(request)\n            })\n\n          "))))}}}]);
//# sourceMappingURL=component---src-pages-api-supertest-adapter-tsx-c23a33ce00eb3ac90040.js.map