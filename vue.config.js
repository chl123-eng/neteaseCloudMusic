const { resolve } = require("path");
module.exports = {
  transpileDependencies: ["@dcloudio/uni-ui"],
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set("@", resolve("src"));
  },
};
