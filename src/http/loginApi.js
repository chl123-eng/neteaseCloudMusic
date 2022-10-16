import { fetch } from "@/http/fetch";

export const login = (params) =>
  fetch(`/login/cellphone?phone=${params.phone}/passward=${params.passward}`);
