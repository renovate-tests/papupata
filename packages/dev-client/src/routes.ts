import { ReactNode } from 'react'
import TopLayout from './layouts/TopLayout'
import APIListView from './views/APIListView'

export type RouteComponentImpl = (params: any) => ReactNode

export type Route = {
  name: string
  path: string
  children?: Route[]
} & ({ addComponents: RouteComponentImpl[] } | { setComponents: RouteComponentImpl[] })

const routes: Route[] = [
  {
    name: 'listAPIs',
    path: '/',
    setComponents: [TopLayout, APIListView],
  },
  {
    name: 'viewAPI',
    path: '/api/:apiName',
    setComponents: [],
    children: [
      {
        name: 'overview',
        path: '/overview',
        addComponents: [],
      },
      {
        name: 'makeNewRequest',
        path: '/request',
        addComponents: [],
      },
      {
        name: 'makeNewRequestBasedOn',
        path: '/request/:id/again',
        addComponents: [],
      },
      {
        name: 'viewOldRequest',
        path: '/request/:id',
        addComponents: [],
      },
    ],
  },
]

export default routes
