/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-11-04 15:28:39
 * @LastEditors: chl
 * @LastEditTime: 2022-11-04 15:36:24
 */
import { fetch } from "@/http/fetch";

export const getBanner = () => fetch(`/banner?type=1`, {}, "GET");
