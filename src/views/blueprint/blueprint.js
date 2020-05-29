import Unit from "../unit/Unit.vue";

export default {
  name: "Blueprint",
  props: {
    units: Array
  },
  components: {
    Unit,
  },
  data() {
    let showObjects = false;
    return {
      showObjects,
    };
  },
  methods: {
    addUnit(event, type) {
      let units = this.units;
      units = this.setUnitPositions(units);

      units.push({
        id: units[0] ? units[units.length - 1].id + 1 : 1,
        type: type,
        x: event.x - (screen.width * 1.06) / 2, //converting page x position to canvas x
        y: -135,
        rotation: 0,
      });
      this.$emit("units", units);

    },

    deleteUnit(id) {
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
      units.forEach(function (unit) {
        let newData = document.getElementById("item" + String(unit.id));
        unit.x = newData.getAttribute("data-x") ?
          Number(newData.getAttribute("data-x")) :
          unit.x;
        unit.y = newData.getAttribute("data-y") ?
          Number(newData.getAttribute("data-y")) :
          unit.y
      });
      return units;
    },
  },
};