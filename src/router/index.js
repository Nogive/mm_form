import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import MyNcform from "@/components/MyNcform";
import ncArray from "@/components/ncArray";
import eg from "@/components/eg";
import HelloWorld from "@/components/HelloWorld";
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "MyNcform",
      component: MyNcform
    },
    {
      path: "/sample",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/eg",
      name: "eg",
      component: eg
    },
    {
      path: "/ncArray",
      name: "ncArray",
      component: ncArray
    }
  ]
});
