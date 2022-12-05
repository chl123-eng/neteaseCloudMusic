import { fetch } from "@/http/fetch";

//热搜榜
export const searchHot = () => fetch(`/search/hot`, {}, "GET");
//话题榜
export const hotAlbum = () =>
  fetch(`/album/songsaleboard?limit=10&albumType=1&type=week`, {}, "GET");
//获取搜索匹配的值
export const searchMultimatch = (params) =>
  fetch(`/cloudsearch`, params, "GET");
