/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 15:10:46
 * @LastEditors: chl
 * @LastEditTime: 2022-10-25 10:12:54
 */

import * as $loginApi from "./loginApi";

let apiObj = {
  $loginApi,
};

const install = (Vue) => {
  Vue.prototype.$api = apiObj;
};
export default install;
