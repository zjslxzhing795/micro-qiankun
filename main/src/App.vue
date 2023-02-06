<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/subapp/app-react">app-react</router-link> |
      <router-link to="/subapp/app-vue2">app-vue2</router-link> |
      <!-- <router-link to="/subapp/app-vue3">app-vue3</router-link> | -->
      <router-link to="/iframe">iframe</router-link>
    </div>
    <h1>Micro Frontends</h1>
    <!-- 主应用路由渲染出口 -->
    <router-view />
    <!-- 微前端主应用渲染出口 -->
    <div id="subapp-container"></div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: antiquewhite;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
