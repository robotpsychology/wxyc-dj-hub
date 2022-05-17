// import { Router, createWebHistory } from "vue-router";
import * as VueRouter from 'vue-router';
import store from "vuex"
// import LoginWorld from "../components/LoginWorld.vue"
import Home from "../views/Home.vue";
import About from "../views/About.vue"
import Register from "../components/Register.vue"
import Reports from "../views/Reports.vue"
import Love_Wall from "../views/Love_Wall.vue"

const routes = [
  // {
  //   path: "/",
  //   name: "Login",
  //   component: LoginWorld,
  // },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/love_wall",
    name: "Love Wall",
    component: Love_Wall,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next(false);
      } else {
        next();
        console.log('not allowed')
      }
    }

  },
  {
    path: "/about",
    name: "About",
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

export const router = VueRouter.createRouter({
  // history: VueRouter.createWebHistory(process.env.BASE_URL),
  history: VueRouter.createWebHistory(),
  routes,
});

// export default router;
