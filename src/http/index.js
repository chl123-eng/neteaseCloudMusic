/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 15:10:46
 * @LastEditors: chl
 * @LastEditTime: 2022-11-04 15:30:34
 */

import * as $loginApi from "./loginApi";
import * as $homeApi from "./homeApi";

let apiObj = {
  $loginApi,
  $homeApi,
};

const install = (Vue) => {
  Vue.prototype.$api = apiObj;
};
export default install;
