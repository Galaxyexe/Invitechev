<template>
  <div id="outerContainer">
    <div id="container">
      <div class="overlay">
        <div class="objects" v-if="showObjects==true">
          <div class="overlayObject" v-on:click="addUnit($event, 'Square')" />
          <div class="overlayObject overlayCircle" v-on:click="addUnit($event, 'Circle')" />
        </div>
        <h2 v-on:click="showObjects=!showObjects">Add</h2>
        <h2 id="trash">Trash</h2>
        <h2>Save</h2>
      </div>
      <div v-for="unit in units" :key="unit.id">
        <Unit
          :id="String(unit.id)"
          class="fixed"
          :type="unit.type"
          :x="unit.x"
          :y="unit.y"
          :rotation="unit.rotation"
          :onDelete="deleteUnit"
        ></Unit>
      </div>
    </div>
  </div>
</template>

<script>
import Unit from "./Unit.vue";

export default {
  name: "DragnDrop",
  props: {
    units: Array
  },
  components: {
    Unit
  },
  data: function() {
    let showObjects = false;
    return {
      showObjects
    };
  },
  methods: {
    addUnit(event, type) {
      let units = this.units;
      units = this.setUnitPositions(units);

      units.push({
        id: units[0] ? units[units.length - 1].id + 1 : 1,
        type: type,
        x: event.x - (screen.width * 1.06) / 2,
        y: -135,
        rotation: 0
      });
      this.$emit("units", units);
    },
    deleteUnit(id) {
      console.log(id);
      let units = this.units;
      for (let i = 0; i < units.length; i++) {
        if (units[i].id == id) {
          this.$emit("units", units.splice(i, 1));
          break;
        }
      }
      //~removeIndex && units.splice(removeIndex, 1);
    },
    setUnitPositions(units) {
      units.forEach(function(unit) {
        let newData = document.getElementById("item" + String(unit.id));
        unit.x = newData.getAttribute("data-x")
          ? Number(newData.getAttribute("data-x"))
          : unit.x;
        unit.y = newData.getAttribute("data-y")
          ? Number(newData.getAttribute("data-y"))
          : unit.y;
        unit.rotation = newData.getAttribute("data-angle")
          ? Number(newData.getAttribute("data-angle"))
          : unit.rotation;
      });
      return units;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 100%;
  height: 75vh;
  background-color: #eee; /*#333;*/
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 7px;
  touch-action: none;
  position: relative;
  /*overflow: scroll;*/
}
.overlay {
  position: absolute;
  left: 75%;
  top: 0%;
  width: 25%;
  height: 10%;
  background-color: rgba(255, 255, 255, 0.6); /*rgba(240, 240, 240, 0.6);*/
  z-index: 20000;
  display: table;
  align-items: center;
}
button {
  margin: 0 auto;
}
.fixed {
  position: absolute;
}
h2 {
  border-left: 1px solid darkgray;
  border-right: 1px solid darkgray;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}
.objects {
  position: absolute;
  left: -30%;
  top: 0;
  width: 29.7%;
  margin-right: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  height: 100%;
  display: flex;
  align-items: center;
}
.overlayObject {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(136, 136, 136, 0.5);
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
}
.overlayCircle {
  border-radius: 100%;
}
</style>
