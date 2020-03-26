<template>
  <div id="app">
    <DragnDrop v-bind:units="units">
    </DragnDrop>
    <router-link class="button" to="/blueprint">Hello
    </router-link>
    
  </div>
</template>

<script>
import DragnDrop from './components/DragnDrop.vue'
export default {
  name: 'App',
  components: {
    DragnDrop,
  },
  data: function () {
    return {
      units:[
      {id:1, type:"Rectangle"}
      ]
    }
  },
  methods: {
    present: function() {
    console.log('Hello from blueprint');   // The function returns the product of p1 and p2
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
