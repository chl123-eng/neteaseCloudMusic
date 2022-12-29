import { fetch } from "@/http/fetch";

export const getUserAccount = () => fetch(`/user/account`, {}, "GET");

export const getUserDetail = (param) =>
  fetch(`/user/detail?uid=${param}`, {}, "GET");
