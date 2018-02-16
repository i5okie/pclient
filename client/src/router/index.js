import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import 'babel-polyfill'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Register
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
