/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 15:10:46
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-29 12:41:59
 */

import * as $loginApi from "./loginApi";
import * as $homeApi from "./homeApi";
import * as $searchApi from "./searchApi";
import * as $personalInfoApi from "./personalInfoApi";

let apiObj = {
  $loginApi,
  $homeApi,
  $searchApi,
  $personalInfoApi,
};

const install = (Vue) => {
  Vue.prototype.$api = apiObj;
};
export default install;
