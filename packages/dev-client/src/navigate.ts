import router from './router'

const navigate = {
  toAPI: (apiName: string) => {
    router.navigate('viewAPI', { apiName })
  },
}

export default navigate
