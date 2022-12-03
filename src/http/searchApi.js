import { fetch } from "@/http/fetch";

//热搜榜
export const searchHot = () => fetch(`/search/hot`, {}, "GET");
//话题榜
export const hotTopic = () => fetch(`/hot/topic`, {}, "GET");
