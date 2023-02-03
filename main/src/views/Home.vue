<template>
  <div class="home">
    <button @click="$router.replace('/subapp/app-react')">replaceState测试</button>
    <button @click="onLoadReact">加载react组件</button>
    <button @click="onLoadVue2">加载vue2组件</button>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="主应用" />
    <div id="react"></div>
    <div id="vue2"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { loadMicroApp } from "qiankun";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      microReact: {},
      microVue2: {},
    };
  },
  methods: {
    onLoadReact() {
      console.log("react load");
      if (Object.keys(this.microReact).length === 0) {
        this.microReact = loadMicroApp({
          name: "app-react",
          entry: "//localhost:3000", // 子应用 HTML 入口
          container: "#react", // 渲染到哪里
          props: {
            // 主应用传递给子应用的数据，子应用mount钩子内可获取
            brand: "qiankun-react",
          },
        });
      }
      console.log("microReact=", this.microReact);
    },
    onLoadVue2() {
      console.log("vue2 load");
      if (Object.keys(this.microVue2).length === 0) {
        this.microVue2 = loadMicroApp({
          name: "app-vue2",
          entry: "//localhost:2000",
          container: "#vue2",
          props: {
            // 主应用传递给子应用的数据，子应用mount钩子内可获取
            brand: "qiankun-vue2",
          },
        });
      }
    },
  },
  beforeDestroy() {
    Object.keys(this.microReact).length > 0 && this.microReact.unmount();
    Object.keys(this.microVue2).length > 0 && this.microVue2.unmount();
  },
};
</script>
