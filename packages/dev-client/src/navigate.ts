import router from './router'

const navigate = {
  toAPI: (apiName: string) => {
    router.navigate('viewAPI', { apiName })
  },

  newRequest: (apiName: string) => {
    router.navigate('viewAPI.makeNewRequest', { apiName })
  },

  toPastRequest: (apiName: string, requestName: string) => {
    router.navigate('viewAPI.viewPastRequest', { apiName, requestName })
  },
  toWaitForResponse: (apiName: string, requestName: string) => {
    router.navigate('viewAPI.waitForRequest', { apiName, requestName })
  },
}

export default navigate
