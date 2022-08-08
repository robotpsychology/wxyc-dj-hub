import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/Login.vue"
import Register from "../components/Login.vue"

import { Account, Flowsheet, About, Reports, Requests, Resources, Profiles } from "@/views"


import { useAuthStore } from "@/store/auth.store.js";


const routes = [
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
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources,
  },
  {
    path: "/rotation",
    name: "Rotation",
    // component: Resources,
  },
  {
    path: "/profiles",
    name: "Profiles",
    component: Profiles,
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

export const router = createRouter({
  // Look into what createWebHistory does here, not sure.
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
});


router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});

