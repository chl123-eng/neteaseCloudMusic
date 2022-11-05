/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-11-04 15:28:39
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-05 16:57:20
 */
import { fetch } from "@/http/fetch";

export const getBanner = () => fetch(`/banner?type=1`, {}, "GET");
