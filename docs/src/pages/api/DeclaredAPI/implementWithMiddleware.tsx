import ImplementBase from './implementBase'
import { Example, Parameter } from '../../../components/api-components'
import { Link } from 'gatsby'

export default function ImplementWithMiddleware() {
  return (
    <ImplementBase
      fnName="implementWithMiddleware"
      variantPurpose={'This variant allows for inclusion of middleware for the implementation.'}
      middlewareParameter={
        <Parameter
          name="middleware"
          dataType={
            <Example>{`
        {
          express?: Function[]
          papupata?: Function[]
        }`}</Example>
          }
        >
          An object with arrays of express and papupata middleware functions. Both arrays are optional. For compatiblity with older versions
          of papupata, this parameter can be just an array of express middleware functions, but that usage is considered deprecated. You can
          use the <Link to="/api/DeclaredAPI/implementWithExpressMiddleware">implementWithExpressMiddleware</Link> instead as it
          specifically implements the old interface of implementWithMiddleware.
        </Parameter>
      }
      examples={
        <Example label="Usage in implementation">
          {`
            myAPI.implementWithMiddleware(
              {
                express: [
                  (req, _res, next) => {
                    console.log(req.url)
                    next()
                  }
                ],
                papupata: [
                  (req, _res, _route, next) => {
                    console.log(req.url)
                    next()
                  }
                ]
              },
              () => {
                return 'hello'
              }
            )
                      
          `}
        </Example>
      }
    />
  )
}
