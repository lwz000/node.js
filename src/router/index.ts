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
    path: '/about',
    name: 'about',
    component: () => import( '../views/about.vue')
  },
  {
    path: '/relax',
    name: 'relax',
    component: () => import( '../views/relax.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
