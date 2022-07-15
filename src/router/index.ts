import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import MapView from "../views/MapView.vue"
import HomeView from "../views/HomeView.vue"
import DiscoverView from "../views/DiscoverView.vue"
import ChatView from "../views/ChatView.vue"
import TestView from "../views/TestView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView
  }, {
    path: "/map",
    name: "map",
    component: MapView
  }, {
    path: "/discover",
    name: "discover",
    component: DiscoverView
  }, {
    path: "/chat",
    name: "chat",
    component: ChatView
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
