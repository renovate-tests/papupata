import { ReactNode } from 'react'
import TopLayout from './layouts/TopLayout'
import APIListView from './views/APIListView'
import NavBarLayout from './layouts/NavBarLayout'
import APINav from './views/APIView/APINav'
import APIView from './views/APIView/APIView'
import ApiOverview from './views/APIView/ApiOverview'
import RequestEditor from './views/APIView/RequestEditor/RequestEditor'
import WaitForRequest from './views/APIView/WaitForRequest'
import ViewPastRequest from './views/APIView/PastRequest/ViewPastRequest'

export type RouteComponentImpl = (params: any) => ReactNode

export type Route = {
  name: string
  path: string
  children?: Route[]
  selfComponents?: RouteComponentImpl[]
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
    setComponents: [TopLayout, NavBarLayout, APINav, APIView],
    selfComponents: [ApiOverview],
    children: [
      {
        name: 'overview',
        path: '/overview',
        addComponents: [],
      },
      {
        name: 'makeNewRequest',
        path: '/request',
        addComponents: [RequestEditor],
      },
      {
        name: 'makeNewRequestBasedOn',
        path: '/request/:id/again',
        addComponents: [],
      },
      {
        name: 'viewPastRequest',
        path: '/request/:requestName',
        addComponents: [ViewPastRequest],
      },
      {
        name: 'waitForRequest',
        path: '/request/:requestName/wait',
        addComponents: [WaitForRequest],
      },
    ],
  },
]

export default routes