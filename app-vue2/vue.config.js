const packageName = require("./package.json").name

module.exports = {
  // publicPath写死不是一个好的解法, webpack支持运行时publicPath
  // publicPath: "/", // 在vue-cli中通过这种方式来设置publicPath, 默认是/
  configureWebpack: {
    mode: "development",
    output: {
      // publicPath: "", // webpack 构建的资源公共路径是这样设置的
      library: `${packageName}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    headers: {
      // 允许跨域
      "Access-Control-Allow-Origin": "*",
    },
  },
}
