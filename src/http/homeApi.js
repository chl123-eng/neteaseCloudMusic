/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-11-04 15:28:39
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-11-08 17:38:53
 */
import { fetch } from "@/http/fetch";

//banner列表
export const getBanner = () => fetch(`/banner?type=1`, {}, "GET");

//推荐歌单列表
export const recommendList = () => fetch(`/personalized`, {}, "GET");

//获取歌单详情
export const playList = (params) =>
  fetch(`/playlist/detail?id=${params}`, {}, "GET");

//获取音乐url
export const getSongUrl = (params) =>
  fetch(`/song/url/v1?id=${params}`, {}, "GET");
