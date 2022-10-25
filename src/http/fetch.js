/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-21 09:38:08
 * @LastEditors: chl
 * @LastEditTime: 2022-10-25 10:14:12
 */
import { requestConstData } from "@/const/index";

const errCodeWhiteList = [];
export function fetch(url, data, headers, methods) {
  return new Promise((resolve, reject) => {
    uni.request({
      url, //仅为示例，并非真实接口地址。
      data,
      methods,
      header: {
        "content-type": "application/json", //自定义请求头信息
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

uni.addInterceptor("request", {
  invoke(args) {
    // request 触发前拼接 url
    args.url = requestConstData.BASE_URL + args.url;
  },
  success() {},
  fail(err) {
    handleError(err);
  },
});

const handleError = (errObj) => {
  switch (errObj.statusCode) {
    case 404:
      uni.showToast({
        icon: "error",
        title: "请求资源不存在",
        duration: 1000,
      });
      break;
    case 401:
      uni.showToast({
        icon: "error",
        title: "请重新登录",
        duration: 1000,
      });
      break;
    default:
      if (~errCodeWhiteList.indexOf(errObj.statusCode))
        return new Promise((resolve) => {
          resolve(errObj);
        });
      else {
        uni.showToast({
          icon: "error",
          title: errObj.errMsg,
          duration: 1000,
        });
      }
  }
};
