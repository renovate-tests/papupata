import React, { createContext, ReactNode, useContext } from 'react'
import { useRoute } from 'react-router5'
import routes, { RouteComponentImpl } from './routes'
import { Route } from './routes'

export const routeComponentContext = createContext<RouteComponentImpl[]>([])

interface Props {
  skip?: number
}

export default function RouteComponent({ skip }: Props) {
  const ctx = useContext(routeComponentContext)
  const [Component, ...rest] = ctx.slice(skip || 0)
  const route = useRoute()
  const props = route.route?.params || {}

  if (!Component) return <span>Route component needed but not specified</span>

  const ComponentA = Component as any

  return (
    <routeComponentContext.Provider value={rest}>
      <ComponentA {...props} />
    </routeComponentContext.Provider>
  )
}

export function RouteComponentRootProvider({ children }: { children: ReactNode }) {
  const route = useRoute()
  if (route.route) {
    const components = getComponentsFor(route.route.name)
    return <routeComponentContext.Provider value={components}> {children}</routeComponentContext.Provider>
  } else {
    return <>{children}</>
  }
}

function getComponentsFor(route: string) {
  const routeChain = getRouteChain(route)
  if (!routeChain) return []
  return routeChain.reduceRight<{ locked: boolean; components: RouteComponentImpl[] }>(
    (agg, route) => {
      if (agg.locked) return agg
      if ('setComponents' in route) {
        return {
          locked: true,
          components: [...route.setComponents, ...agg.components],
        }
      } else {
        return {
          locked: false,
          components: [...route.addComponents, ...agg.components],
        }
      }
    },
    { locked: false, components: routeChain[routeChain.length - 1].selfComponents || [] }
  ).components
}

function getRouteChain(to: string) {
  return getRouteChainFrom('', routes, to)
}

function getRouteChainFrom(prefix: string, startPoint: Route[], to: string): Route[] | null {
  for (const route of startPoint) {
    if (prefix + route.name === to) {
      return [route]
    } else if (route.children) {
      const child = getRouteChainFrom(prefix + route.name + '.', route.children, to)
      if (child) return [route, ...child]
    }
  }
  return null
}
