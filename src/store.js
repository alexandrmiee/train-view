import Config from "@/ORM/models/Config";
import Template from "@/ORM/models/Template";
import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";

Vue.use(Vuex);

const database = new VuexORM.Database();
database.register(Config);
database.register(Template);

VuexORM.use(VuexORMAxios, {
  database,
  http: {
    baseURL: "http://127.0.0.1:3000",
    url: "/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [VuexORM.install(database)]
});
