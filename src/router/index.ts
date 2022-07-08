import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MapView from '../views/MapView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'map',
    component: MapView
  }, {
    path: "/test",
    name: "test",
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
