import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

const viewImporter = name => () => import(`./views/${name}.vue`);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: viewImporter("Home")
    }
  ]
});
