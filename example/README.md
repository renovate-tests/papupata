## Papupata TODO list example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running

You can start the example application using the command `npm start` to start the webkit dev server running the browser application
and `npm run start:server` to start its backend.

## Points of interest

- `src/TodoAPI.ts` (in that directory because it's not trivial to access files outside the src directory after create-react-app). This file declares all the APIs available in the application.
- `server-src/app.ts` The entire backend for the application. If you experiment with the route implementations you'll see that attempting to access anything not declared from the query, body or params of the request will result in a type error.

The requests to the APIs are spread throughout the client application. Similarly if you experiment with them you'll notice that the calls require everything declared, and similarly don't allow anything that wasn't


