  1.5.0
- Added support for papupata middleware for individual routes
- Added support for papupata middleware shared by all routes of an API declaration (config option inherentMiddleware)
- Added built-in middleware handleUndefinedResponsesMiddleware
- Added skipHandlingRoute
- Added support for automatically implementing all APIs to return 501 Not Implemented, until actually implemented, instead of letting other handlers take over (config option autoImplementAllAPIs) -- todo: let a route opt out
- Added implementation methods implementWithPapupataMiddleware and implementWithExpressMiddleware
- implementWithMiddleware now accepts an object with papupata and express middleware; providing an array of express middleware is still supported but considered deprecated.
- declared APIs expose all URL-based parameters as apiUrlParameters
- declared APIs expose their method as method
- declared APIs expose their API declaration as apiDeclaration; unfortunately it is typed as "any" because 
typing it properly is extremely difficult, if even possible at all. 
- declared APIs now officially expose implementation, and now also implementationMiddleware
- A breaking change in an unlikely use cases: route implementations can be replaced, and that replacement
  happens in all apps/routers that implemented the route. Previously the replacement would only affect
  the current app/router.
- Mock implementations can gain access to non-object bodies
- Added support for patch method
- Added support for variance between body type as seen on the client and as seen on the server (analogous to how response already was)
- Updated to latest version of @types/express, which caused minor changes to typing. Could be a breaking change for users of an older version.


  1.4.0
- Added support for routerAt in configuration
- Added getDeclaredAPIs to API Declaration

  1.3.0

- Support for invoking APIs without parameters without even the empty object
- Support for invoking APIs with non-object bodies
- Support for route options
- Support for request options

  1.2.0

- Added "route" parameter to makeRequest

  1.1.0

- Added mock, mockOnce and unmock

  1.0.1

- Fix path parameters not working for invocations in environments that do not support regexp lookbehind

  1.0.0

- Non-breaking update, bumping to 1.0.0 because we are in production use now
- getURL can now be given query parameters in addition to the path parameters
