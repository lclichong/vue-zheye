import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from '../views/ColumnDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
