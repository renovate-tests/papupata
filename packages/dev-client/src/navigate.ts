import router from './router'

const navigate = {
  toAPI: (apiName: string) => {
    router.navigate('viewAPI', { apiName })
  },

  newRequest: (apiName: string) => {
    router.navigate('viewAPI.makeNewRequest', { apiName })
  },
}

export default navigate
