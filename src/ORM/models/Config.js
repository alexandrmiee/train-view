import { Model } from "@vuex-orm/core";

export default class Config extends Model {
  static entity = "config";

  static fields() {
    return {
      id: this.increment(),
      title: this.string("")
    };
  }
}
