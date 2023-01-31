const packageName = require("./package.json").name

module.exports = {
  configureWebpack: {
    mode: "development",
    output: {
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