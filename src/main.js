/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-10-22 14:54:12
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
