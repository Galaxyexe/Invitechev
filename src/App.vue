<template>
  <div id="app">
    <DragnDrop v-bind:units="units">
    </DragnDrop>
    <router-link action: class="button" to="about">
      <span @click="present()">Hello</span>
    </router-link>
  
  </div>
</template>

<script>
// const axios = require("axios");
import DragnDrop from './components/DragnDrop.vue'
export default {
  name: 'App',
  components: {
    DragnDrop,
  },
  data() {
    return {
      units:[
      {id:1, type:"Rectangle"}
      ]
    }
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
