// vue路由
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 引入
import HomeView from '../views/home.vue'  //主页


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/relax',
    name: 'relax',
    component: () => import( '../views/relax.vue')
  },
  {
    path: '/birthday',
    name: 'birthday',
    component: () => import( '../views/birthday.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
