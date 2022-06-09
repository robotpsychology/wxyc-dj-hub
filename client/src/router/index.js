// import { Router, createWebHistory } from "vue-router";
import * as VueRouter from 'vue-router';

import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Account from "../views/Account.vue"

import Flowsheet from "../views/Flowsheet.vue";
import About from "../views/About.vue"
import Reports from "../views/Reports.vue"
import Requests from "../views/Requests.vue"
import Resources from "../views/Resources.vue"
import Profiles from "../views/Profiles"

const routes = [
  // {
  //   path: "/",
  //   name: "Login",
  //   component: LoginWorld,
  // },
  {
    path: "/",
    name: "Flowsheet",
    component: Flowsheet,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    // meta: { requiresAuth: true }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
    meta: { requiresAuth: true }
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources,
    meta: { requiresAuth: true }
  },
  {
    path: "/profiles",
    name: "Profiles",
    component: Profiles,
    meta: { requiresAuth: true }
    // beforeEnter: (to, from, next) => {
    //   if (store.state.authenticated == false) {
    //     next(false);
    //   } else {
    //     next();
    //     console.log('not allowed')
    //   }
    // }
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

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/love_wall', '/reports'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');

//   // trying to access a restricted page + not logged in
//   // redirect to login page

//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

// export default router;
