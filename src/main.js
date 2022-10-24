/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-10-24 22:34:30
 */
import Vue from "vue";
import App from "./App";
import { fetch } from "@/http/fetch";
import api from "./http/index";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;
Vue.prototype.$store = store;
Vue.use(api);
App.mpType = "app";
const app = new Vue({
  store,
  ...App,
});

app.$mount();
