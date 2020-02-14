import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Employee from '../views/Employee.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      // path: '/',
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/employee',
      name: 'employee',
      component: Employee
    }
  ]
})
