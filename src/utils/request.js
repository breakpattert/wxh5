import Tips from './tips'
// import MpvueRouterPatch from 'mpvue-router-patch'

// import store from '../store'
// import { login, setStorage, getStorage } from '@/utils/wechat'

import Fly from 'flyio'
// import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()

// const tokenFly = new Fly()
// let csrfToken = getStorage('openId') ? getStorage('openId') : null

const baseUrlApi = '/app'
// const baseUrlApi = '/ewei_shopv2_api.php'

fly.config.timeout = 10000

fly.config.headers = {
  'content-type': 'application/x-www-form-urlencoded'
}
fly.config.baseURL = baseUrlApi

fly.interceptors.request.use(async (request) => {
  Tips.loading()
  // debugger
  // if (!store.state.user.userInfo) {
  //   debugger
  // }
  return request
  // if (!csrfToken) {
  //   fly.lock()
  //   const jsCode = await login()

  //   tokenFly.config.headers = {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   }
  //   tokenFly.post('https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=wxapp.login', {
  //     code: jsCode,
  //     comefrom: 'wxapp',
  //     openid: null
  //   }).then((d) => {
  //     request.headers['openid'] = csrfToken = d.data.openid
  //     setStorage('openId', csrfToken)
  //     fly.unlock()
  //     return request
  //   }, (err) => {
  //     console.log(err)
  //   })
  // } else {
  //   request.headers['openid'] = csrfToken
  //   return request
  // }
})

fly.interceptors.response.use(
  (response, promise) => {
    Tips.loaded()
    if (typeof response.data === 'string') {
      return promise.resolve(JSON.parse(response.data))
    } else {
      return promise.resolve(response.data)
    }   
  },
  (err, promise) => {
    // wx.showToast({
    //   title: err.message,
    //   icon: 'none'
    // })
    Tips.toast(err.message, function () {}, 'none')
    console.log(err)
    Tips.loaded()
    return promise.resolve()
  }
)

export default fly
