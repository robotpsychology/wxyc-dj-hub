<template>
  <div id="app">
    <Header></Header>

    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: { Header },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#menubar-end {
  display: flex;
}

/* #nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
}

#nav img {
  justify-items: left;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
