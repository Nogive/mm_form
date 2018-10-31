<template>
  <div id="app">
    <div class="outer">
      <div class="link">
        <router-link to="/">all</router-link> |
        <router-link to="/sample">Try</router-link> |
        <router-link to="/ncArray">array&object </router-link> 
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  
}
.outer{
  text-align: center;
}
.link{
  border-bottom: 1px solid red;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>
