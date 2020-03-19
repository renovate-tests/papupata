import createInvokeImplementationAdapter, {
  InvokerImplementationOptions as Options,
} from './invokeImplementationAdapter'
import { MockableAPI } from './mockableAPI'

export default async function testInvoke<Arg, Ret>(
  api: MockableAPI<Arg, Ret>,
  args: Arg,
  options: Options<any> = {}
): Promise<Ret> {
  const oldConfig = api.apiDeclaration.getConfig()

  try {
    api.apiDeclaration.configure({
      ...oldConfig,
      baseURL: oldConfig?.baseURL || '',
      makeRequest: createInvokeImplementationAdapter(options),
    })
    return await api(args)
  } finally {
    api.apiDeclaration.configure(oldConfig)
  }
}
