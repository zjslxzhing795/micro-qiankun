import { handleRourer } from "./handle-router";
import { rewriteRouter } from "./rewrite-router";

let _apps = [];
export const getApps = () => _apps;
export const registerMicroApps = function (apps) {
  _apps = apps;
};

export const start = function () {
  /**
   * 微前端的运行原理
   */
  // 1.监视路由变化
  rewriteRouter();
  // 初始执行匹配（刷新时调用）
  handleRourer();
  // 2. 匹配子应用
  // 3. 加载子应用
  // 4. 渲染子应用
};
