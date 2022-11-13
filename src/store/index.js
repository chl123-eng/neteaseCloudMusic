/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:41:15
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-11-13 11:09:53
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import login from "./modules/login";
import hlAudio from "./modules/hlAudio";
import recommendList from "./modules/recommendList";
export default new Vuex.Store({
  modules: {
    login,
    hlAudio,
    recommendList,
  },
});
