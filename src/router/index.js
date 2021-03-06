import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Employee from '../views/Employee.vue'
import Test from '../views/test.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
