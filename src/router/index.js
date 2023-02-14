import { createRouter, createWebHistory } from "vue-router"

import Dashboard from "../views/Dashboard.vue"
import Search from "../views/Search.vue"

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/search/:query',
    name: 'search',
    component: Search
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router