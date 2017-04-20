import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'

import App from './App'
import routes from './routes'
import MuseUI from 'muse-ui'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

import store from './vuex/store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Electron)
Vue.use(Router)
Vue.use(MuseUI)
// tada!
Vue.use(VueRx, Rx)

import './assets/css/font.css'
import './assets/css/icon.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题

Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
