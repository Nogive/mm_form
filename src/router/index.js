import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import ncArray from "@/components/ncArray";
import eg from "@/components/eg";
import HelloWorld from "@/components/HelloWorld";
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "eg",
      component: eg
    },
    {
      path: "/sample",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/ncArray",
      name: "ncArray",
      component: ncArray
    }
  ]
});
