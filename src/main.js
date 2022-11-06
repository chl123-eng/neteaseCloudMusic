/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-06 11:24:15
 */
import Vue from "vue";
import App from "./App";
import { fetch } from "@/http/fetch";
import api from "./http/index";
import store from "./store";
import "@/assets/scss/index.scss";
import icon from "@/components/common/icon.vue";

Vue.config.productionTip = false;
Vue.prototype.$fetch = fetch;
Vue.prototype.$store = store;
Vue.use(api);
Vue.component("hlIcon", icon);
App.mpType = "app";
const app = new Vue({
  store,
  ...App,
});

app.$mount();
