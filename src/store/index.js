/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:41:15
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-05 15:10:14
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import login from "./modules/login";
import hlAudio from "./modules/hlAudio";
import recommendList from "./modules/recommendList";
import search from "./modules/search";
export default new Vuex.Store({
  modules: {
    login,
    hlAudio,
    recommendList,
    search,
  },
});
