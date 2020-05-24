import browserPlugin from 'router5-plugin-browser'
import createRouter from 'router5'
import routes from './routes'

const router = createRouter(routes, {
  defaultRoute: 'viewAPIs',
})

router.usePlugin(
  browserPlugin({
    useHash: true,
  })
)

router.start()

export default router
