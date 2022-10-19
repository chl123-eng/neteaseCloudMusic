/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: chl
 * @LastEditTime: 2022-10-17 15:38:39
 */
import Vue from "vue";
import App from "./App";
import { fetch } from "@/http/fetch";
import api from "./http/index";

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;
Vue.use(api);
App.mpType = "app";
const app = new Vue({
  ...App,
});

app.$mount();
