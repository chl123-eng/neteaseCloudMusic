/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-10-19 20:25:12
 */
import { fetch } from "@/http/fetch";

//登陆
export const login = (params) =>
  fetch(
    `/login/cellphone?phone=${params.phone}&passward=${params.passward}`,
    params,
    "GET"
  );

//注册
export const register = (params) =>
  fetch(
    `/register/cellphone?phone=${params.phone}&passward=${params.passward}&captcha=${captcha}&nickName=${nickName}`,
    params,
    "GET"
  );

//发送验证码
export const sendCaptcha = (params) =>
  fetch(`/captcha/sent?phone=${params}`, params, "GET");

//验证验证码
export const verifyCaptcha = (params) =>
  fetch(
    `/captcha/verify?phone=${params.phone}&captcha=${params.captcha}`,
    params,
    "GET"
  );
