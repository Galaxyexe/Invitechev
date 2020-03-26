<template>
<div id="outerContainer">
    <div id="container">
      <div v-for ="unit in units" :key="unit.id">
      <Unit :type="unit.type"></Unit>
      </div>
      </div>
  </div>
</template>

<script>
import Unit from './Unit.vue'

export default {
  name: 'DragnDrop',
  props: {
    units: Array,
  },
  components: {
    Unit
  },
  mounted(){
    var dragItem = document.getElementById("item");
    var container = document.getElementById("container");
    console.log(container)
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === dragItem) {
        active = true;
      }
    }

    function dragEnd() {
      initialX = currentX;
      initialY = currentY;

      active = false;
    }

    function drag(e) {
      if (active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  },
  data(){
    return{
    myArray:["e", "j"]

    }
  },
  methods:{
  }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #container {
      width: 100%;
      height: 400px;
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 7px;
      touch-action: none;
    }
</style>
