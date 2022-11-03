/*
 * @Descripttion:
 * @version:
 * @Author:password chl
 * @Date: 2022-10-17 14:48:08
 * @LastEditors: chl
 * @LastEditTime: 2022-11-03 16:59:53
 */
import { fetch } from "@/http/fetch";

//登陆
export const login = (params) =>
  fetch(
    `/login/cellphone?phone=${params.phone}&password=${params.password}`,
    params,
    "GET"
  );

//注册
export const register = (params) =>
  fetch(
    `/register/cellphone?phone=${params.phone}&password=${params.password}&captcha=${params.captcha}`,
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
