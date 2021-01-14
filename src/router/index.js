import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/faceFail',
    name: 'FaceFail',
    component: () => import('../views/Fail.vue')
  },
  {
    path: '/faceSuccess',
    name: 'FaceSuccess',
    component: () => import('../views/Success.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
