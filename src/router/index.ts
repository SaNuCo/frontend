import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MapView from "../views/MapView.vue";
import HomeView from "../views/HomeView.vue";
import DiscoverView from "../views/DiscoverView.vue";
import ChatView from "../views/ChatView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import OfferingView from "../views/OfferingView.vue";
import AddOfferView from "../views/AddOfferView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
  },
  {
    path: "/discover",
    name: "discover",
    component: DiscoverView,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/offering/:id",
    name: "offering",
    component: OfferingView,
  },
  {
    path: "/offering",
    name: "offering",
    component: OfferingView,
  },
  {
    path: "/add",
    name: "add",
    component: AddOfferView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name != "login") {
    if (localStorage.getItem("username")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    if (!localStorage.getItem("username")) {
      next();
    } else {
      next({ path: "/home" });
    }
  }
});

export default router;
