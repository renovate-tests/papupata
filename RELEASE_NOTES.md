  1.3.1 
- Mock function had no access to separate bodies; objects are now combined into
  the main argument, bodies are also available as the second argument regardless
  of if they were separate or not
  
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
