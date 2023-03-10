import Vue from "vue";
import { registerMicroApps, start, initGlobalState } from "qiankun";
// import { registerMicroApps, start } from "./micro-fe";
import { isObjEqual } from "../utils/isObjEqual";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const initialState = { age: 20, class: "grade1" };
// 初始化 state
const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state, prev) => {
  if (!isObjEqual(state, prev)) {
    // state: 变更后的状态; prev 变更前的状态
    console.log("主应用");
    console.log(state, prev);
  }
});
setTimeout(() => {
  actions.setGlobalState({ ...initialState, age: 200 });
}, 2000);
// actions.setGlobalState({ ...initialState, age: 200 });
// actions.offGlobalStateChange();

// 注册子应用
registerMicroApps([
  {
    name: "app-react",
    entry: "//localhost:3000", // 子应用 HTML 入口
    container: "#subapp-container", // 渲染到哪里
    activeRule: "/subapp/app-react", // 路由匹配规则
    props: {
      // 主应用传递给子应用的数据，子应用mount钩子内可获取
      nickname: "zj",
      age: 18,
    },
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
start({
  sandbox: {
    strictStyleIsolation: true, // 使用shadow-dom 进行样式隔离
    // experimentalStyleIsolation: true, // 通过添加选择器范围来解决样式冲突
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
