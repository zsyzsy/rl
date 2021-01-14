import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('./Sign.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('./Contract.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
