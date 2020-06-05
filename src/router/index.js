import Vue from "vue";
import VueRouter from "vue-router";

import Blueprint from "../views/blueprint/Blueprint.vue";
import Home from "../views/Home.vue";
import Inventory from "../views/inventory/Inventory.vue";
import Edit from "../views/inventory/edit/Edit.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/blueprint",
    name: "blueprint",
    component: Blueprint, //() => import('@/views/blueprint/Blueprint.vue')
  },
  {
    path: "/inventory/edit",
    name: "editInventory",
    props: true,

    component: Edit,
    beforeLeave: (to, from, next) => {
      console.log("Here");
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/inventory/items",
    name: "items",
    component: Inventory,
    props: { screen: "items" },
  },
  {
    path: "/inventory/shipment",
    name: "shipment",
    props: { screen: "shipment" },

    component: Inventory,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
