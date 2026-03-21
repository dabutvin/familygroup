import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About.vue"),
  },
  {
    path: "/tree",
    name: "tree",
    component: () => import("./views/Tree.vue"),
  },
  {
    path: "/photos",
    name: "photos",
    component: () => import("./views/Photos.vue"),
  },
  {
    path: "/stories",
    name: "stories",
    component: () => import("./views/Stories.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 0 };
    }
    return { top: 0 };
  },
});

export default router;
