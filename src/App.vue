<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  color: #333;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #333;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
