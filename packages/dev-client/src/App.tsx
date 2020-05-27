import React from 'react'
import { RouterProvider } from 'react-router5'
import router from './router'
import RouteComponent, { RouteComponentRootProvider } from './RouteComponent'
import { createGlobalStyle } from 'styled-components'
import { FetchedConfigProvider } from './config'
import AuthenticationVerifier from './views/Authentication/AuthenticationVerifier'
import { APIProvider } from './apiContext'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;padding:0;
  }
`

function App() {
  return (
    <RouterProvider router={router}>
      <RouteComponentRootProvider>
        <FetchedConfigProvider source={'/papupata-client-config.json'}>
          <APIProvider>
            <GlobalStyle />
            <AuthenticationVerifier>
              <RouteComponent />
            </AuthenticationVerifier>
          </APIProvider>
        </FetchedConfigProvider>
      </RouteComponentRootProvider>
    </RouterProvider>
  )
}

export default App
