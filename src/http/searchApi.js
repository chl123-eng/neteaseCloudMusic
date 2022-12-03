import { fetch } from "@/http/fetch";

//热搜榜
export const searchHot = () => fetch(`/search/hot`, {}, "GET");
//话题榜
export const hotAlbum = () =>
  fetch(`/album/songsaleboard?limit=10&albumType=1&type=week`, {}, "GET");
