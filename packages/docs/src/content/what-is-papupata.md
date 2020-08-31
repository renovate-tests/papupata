---
layout: page
title: 'What is papupata'
---

Papupata is a typescript library that allows for declaring, implementing and calling APIs in a type safe fashion.

While it is at its most powerful when used for everything, you can pick the parts you need piecemeal as well. You can use it to
declare an external API, isolating the type definitions to a single well defined place, allowing the rest of code base to
use the API in atype safe fashion. Or you could declare the API your application implements and get rid of the untyped params
query and body objects.

When both the client and server utilize papupata declarations, you can be certain that the data sent from the client
is going to match the data expected by the server, and that the server responds with what the client expects.

Implementing is only directly supported with express at this time.
