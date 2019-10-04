<template>
  <div id="app" class="app">
    <navigation-bar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "@/components/Navigation/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar
  }
};
</script>
<style lang="scss" scoped>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
