import Vue from "vue";
import { registerMicroApps, start } from "qiankun";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 注册子应用
registerMicroApps([
  {
    name: "app-react",
    entry: "//localhost:3000", // 子应用 HTML 入口
    container: "#subapp-container", // 渲染到哪里
    activeRule: "/subapp/app-react", // 路由匹配规则
  },
  {
    name: "app-vue2",
    entry: "//localhost:2000",
    container: "#subapp-container",
    activeRule: "/subapp/app-vue2",
  },
  {
    name: "app-vue3",
    entry: "//localhost:5173",
    container: "#subapp-container",
    activeRule: "/subapp/app-vue3",
  },
]);
// 启动子应用
start();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
