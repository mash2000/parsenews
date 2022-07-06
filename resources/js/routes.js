import VueRouter from "vue-router";
import News from './news/News';

const routes = [
  {
    path: "/",
    component: News,
    name: "home",
  },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;