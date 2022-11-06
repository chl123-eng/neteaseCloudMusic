/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:41:15
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-06 12:08:08
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import login from "./modules/login";
import hlAudio from "./hlAudio";
export default new Vuex.Store({
  modules: {
    login,
    hlAudio,
  },
});
