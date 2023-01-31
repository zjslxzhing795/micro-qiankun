import { handleRourer } from "./handle-router";

let prevRoute = ""; // 上一个路由
let curRoute = window.location.pathname; // 下一个路由
export const getPrevRoute = () => prevRoute;
export const getCurRoute = () => curRoute;

export const rewriteRouter = function () {
  /**
   * hash路由: window.onhashchange
   * history路由: history.go、history.back、history.forward使用popstate事件 window.onpopstate
   * history.pushState、history.replaceState需要通过函数重写的方式进行劫持
   */

  // window.onpopstate = function () {};  回覆盖原函数，使用addEventlistener的方式更好
  // 浏览器前进后退，以及手动调用history.go、history.back、history.forward
  // popstate触发的时候，路由已经完成了导航
  window.addEventListener("popstate", () => {
    prevRoute = curRoute;
    curRoute = window.location.pathname;
    handleRourer();
  });
  // history.pushState、history.replaceState需要通过函数重写的方式进行劫持
  const rawPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    // 导航前
    prevRoute = window.location.pathname;
    rawPushState.apply(window.history, args);
    // 导航后
    curRoute = window.location.pathname;
    handleRourer();
  };
  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    // 导航前
    prevRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    // 导航后
    curRoute = window.location.pathname;
    handleRourer();
  };
};
