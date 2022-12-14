/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:52:14
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2022-11-06 10:53:02
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    uni: true,
    wx: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "linebreak-style": [0, "error", "windows"],
  },
};
