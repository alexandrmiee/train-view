import { Model } from "@vuex-orm/core";

export default class Template extends Model {
  static entity = "template";

  static fields() {
    return {
      id: this.increment(),
      name: this.string("")
    };
  }

  static methodConf = {
    http: {
      url: "/modules/:name/template"
    },
    $get: {
      name: "get",
      http: {
        url: "/:name",
        method: "get"
      }
    }
  };
}
