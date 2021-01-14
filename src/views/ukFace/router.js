import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/faceFail',
    name: 'FaceFail',
    component: () => import('./Fail.vue')
  },
  {
    path: '/faceSuccess',
    name: 'FaceSuccess',
    component: () => import('./Success.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
