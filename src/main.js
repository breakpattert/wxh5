// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'lib-flexible/flexible'

import store from '@/store'

import api from '@/utils/api'
import Utils from '@/utils'
import to from 'await-to-js'

import Tips from '@/utils/tips'
import Validate from '@/utils/validate'
Vue.prototype._U = Utils
Vue.prototype.$tips = Tips
Vue.prototype.$validate = Validate
Vue.prototype.$http = api
Vue.prototype._to = to
Vue.prototype.$url = '../../../static/images/'
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
app.$mount()
