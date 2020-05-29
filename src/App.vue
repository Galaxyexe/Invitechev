<template>
  <div id="app">
    <router-view :units="units" />
    <router-link action: class="button" to="about">
      <span @click="present()">Hello</span>
      <button @click="window.open({url})"></button>
    </router-link>
  
  </div>
</template>

<script>
// const axios = require("axios");
export default {
  name: 'App',
  data() {
    return {
      url: 'localhost:8080/blueprint',
      units:[
      {id:1, type:"Rectangle", x:-180.906, y: -4.10156},
      ]
    }
  },
  mounted: function(){
  }

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
