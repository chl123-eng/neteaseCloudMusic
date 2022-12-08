/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-11-04 15:28:39
 * @LastEditors: chl123-eng 1326090238@qq.com
 * @LastEditTime: 2022-12-08 13:32:04
 */
import { fetch } from "@/http/fetch";

//banner列表
export const getBanner = () => fetch(`/banner?type=1`, {}, "GET");

//推荐歌单列表
export const recommendList = (params) =>
  fetch(`/personalized?limit=${params}`, params, "GET");

//获取歌单详情
export const playList = (params) =>
  fetch(`/playlist/detail?id=${params}`, {}, "GET");

//获取音乐url
export const getSongUrl = (params) =>
  fetch(`/song/url?id=${params}`, {}, "GET");
//获取推荐歌曲
export const getRecommendSongs = () =>
  fetch(`/personalized/newsong?limit=9`, {}, "GET");
