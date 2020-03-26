<template>
  <div v-if="type=='Rectangle'">
    <div id="item"></div>
  </div>
</template>

<script>

export default {
  name: 'Unit',
  props: {
    type: String,
  },
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
#item {
      width: 100px;
      height: 100px;
      background-color: rgb(245, 230, 99);
      border: 10px solid rgba(136, 136, 136, .5);
      border-radius: 50%;
      touch-action: none;
      user-select: none;
    }
    #item:active {
      background-color: rgba(168, 218, 220, 1.00);
    }
    #itemx:hover {
      cursor: pointer;
      border-width: 20px;
    }
</style>
