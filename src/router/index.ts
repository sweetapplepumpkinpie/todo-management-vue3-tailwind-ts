import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layouts/Base.vue"),
    children: [
      {
        path: "/todos",
        name: "todos",
        component: () => import("../pages/Todos.vue"),
      },
      {
        path: "/backlog",
        name: "backlog",
        component: () => import("../pages/Backlog.vue"),
      },
      {
        path: "",
        redirect: "/todos",
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
