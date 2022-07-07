import VueRouter from "vue-router";
import News from './news/News';
import Single from './news/Single';

const routes = [
  {
    path: "/",
    component: News,
    name: "home",
  },
  {
    path: "/article/:id",
    component: Single,
    name: "single",
  },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;