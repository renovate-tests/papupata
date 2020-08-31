---
layout: page
title: 'API Reference'
---

## Primary functionality

These exported entities can be accessed directly from the main papupata library.

### APIDeclaration

This class is the where almost everything happens, it is used for declaring, implementing and calling APIs.

[Reference](/api/APIDeclaration)

Methods on the API declaration can be used to create [PartiallyDeclaredAPI](/api/PartiallyDeclaredAPI)s, which in turn become [DeclaredAPI](/api/DeclaredAPI)s

### convertExpressMiddleware

This function converts express middleware to papupata middleware.

[Reference](/api/convertExpressMiddleware)

### skipHandlingRoute

This special value allows for having express continue routing.

[Reference](/api/skipHandlingRoute)

### handleUndefinedResponsesMiddleware

This middleware changes how undefined API responses values are handled.

[Reference](/api/handleUndefinedResponsesMiddleware)

## Secondary functionality

These exported entities are considered support functionality can be imported from their own files.

[Reference](/api/requestPromiseAdapter)

### fetchAdapter

This adapter allows you to call the APIs using global fetch as the means for doing so.

[Reference](/api/fetchAdapter)

### requestPromiseAdapter

This adapter allows you to call the APIs using global request promsie as the means for doing so.

[Reference](/api/requestPromiseAdapter)

### supertestAdapter

This adapter allows you to call the APIs using supertest

[Reference](/api/requestPromiseAdapter)

### supertestAdapter

This adapter allows you to call the APIs using supertest

[Reference](/api/supertestAdapter)

### supertestInvoker

This adapter allows you to call the APIs using supertest while giving you access to the supertest request for making assertions.

[Reference](/api/supertestInvoker)

### invokeImplementationAdapter

This adapter allows you to call the APIs without actually running an express server, primarily in tests.

[Reference](/api/invokeImplementationAdapter)

### testInvoker

This function allows you to call the APIs without actually running an express server, primarily in tests.

[Reference](/api/testInvoker)
