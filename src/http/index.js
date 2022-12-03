/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 15:10:46
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-03 11:03:13
 */

import * as $loginApi from "./loginApi";
import * as $homeApi from "./homeApi";
import * as $searchApi from "./searchApi";

let apiObj = {
  $loginApi,
  $homeApi,
  $searchApi,
};

const install = (Vue) => {
  Vue.prototype.$api = apiObj;
};
export default install;
