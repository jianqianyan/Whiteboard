import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import loginView from "../views/loginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
    },
    {
      path: "/login",
      name: "login",
      component: loginView,
    },
  ],
});

export default router;
