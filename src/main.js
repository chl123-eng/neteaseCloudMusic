import Vue from "vue";
import App from "./App";
import { fetch } from "@/http/fetch";

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;
App.mpType = "app";
const app = new Vue({
  ...App,
});

app.$mount();
