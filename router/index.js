import {
  createRouter,
  createWebHistory,
} from "vue-router";
import PreviewPage from "../views/PreviewPage.vue";

const routes = [
  {
    path: "/preview",
    name: "PreviewPage",
    component: PreviewPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
