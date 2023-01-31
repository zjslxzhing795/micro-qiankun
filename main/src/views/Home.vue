<template>
  <div class="home">
    <button @click="$router.replace('/subapp/app-react')">replaceState测试</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="主应用" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
