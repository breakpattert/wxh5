import { login } from '@/utils/wechat'
import $http from '@/utils/api'
const user = {
  state: {
    userOpen: null,
    userInfo: null,
    locationInfo: null,
    systemInfo: null,
    clusterInfo: null,
    doAuth: false,
    newsinfo: null,
    ids: ''
  },
  mutations: {
    SET_USER_OPEN: (state, userOpen) => {
      state.userOpen = userOpen
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info
    },
    SET_DO_AUTH: (state, info) => {
      state.doAuth = info
    },
    SET_LOCATION_INFO: (state, paylode) => {
      state.locationInfo = paylode
    },
    SET_SYSTEM_INFO: (state, paylode) => {
      state.systemInfo = paylode
    },
    SET_CLUSTER_INFO: (state, paylode) => {
      state.clusterInfo = paylode
    },
    SET_NEWS_INFO: (state, paylode) => {
      state.newsinfo = paylode
    },
    SET_IDS: (state, paylode) => {
      state.ids = paylode
    }
  },
  actions: {
    async getUserOpen ({commit}) {
      const jsCode = await login()
      const res = await $http.getOpenId(jsCode)
      res['openId'] = 'sns_wa_' + res.openid
      res.openid = 'sns_wa_' + res.openid
      commit('SET_USER_OPEN', res)
      commit('SET_USER_INFO', res)
    }
  }
}

export default user
