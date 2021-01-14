import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { Dialog, Toast } from 'vant'
import '@/style/main.less'
import '@/utils/common.js'
import initialization from './routingLAN.js'
initialization(router)

Vue.config.productionTip = false
Vue.use(Dialog)
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
