import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import loginView from "../views/loginView.vue";
import boardPage from "../views/index/boardPage.vue";
import homePage from "../views/index/homePage.vue";
import userPage from "../views/index/userPage.vue";
import errorPage from "../views/index/errorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/index/homePage",
    },
    {
      path: "/index",
      name: "index",
      component: IndexView,
      children: [
        {
          path: "boardPage",
          name: "boardPage",
          component: boardPage,
        },
        {
          path: "homePage",
          name: "homePage",
          component: homePage,
        },
        {
          path: "userPage",
          name: "userPage",
          component: userPage,
        },
        {
          path: "errorPage",
          name: "errorPage",
          component: errorPage,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: loginView,
    },
  ],
});

export default router;
