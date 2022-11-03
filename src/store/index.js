/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:41:15
 * @LastEditors: chl
 * @LastEditTime: 2022-11-03 17:22:50
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import login from "./modules/login";
export default new Vuex.Store({
  modules: {
    login,
  },
});
