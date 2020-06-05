import OverlayBar from "../../components/OverlayBar.vue";
import Unit from "../unit/Unit.vue";

export default {
  name: "Blueprint",
  props: {
    units: Array,
  },
  components: {
    OverlayBar,
    Unit,
  },
  data() {
    let showObjects = false;
    let overlayItems = [
      {
        id: 0,
        name: "Add",
        onClick: function() {
          let items = this.overlayItems;
          if (items.length == 3) {
            items.unshift({
              id: 3,
              className: "overlayShape overlaySquare",
              onClick: function(event) {
                console.log(event);
                this.addUnit(event, "Square");
              }.bind(this),
            });
            items.unshift({
              id: 4,
              className: "overlayShape overlayCircle",
              onClick: function(event) {
                this.addUnit(event, "Circle");
              }.bind(this),
            });
            this.overlayItems = items;
          } else items.splice(0, 2); //remove square and circle
        }.bind(this),
      },
      {
        id: 1,
        name: "Trash",
      },
      {
        id: 2,
        name: "Save",
      },
    ];
    return {
      overlayItems,
      showObjects,
    };
  },
  methods: {
    addUnit(event, type) {
      let units = this.units;
      units = this.setUnitPositions(units);
      let position = document
        .getElementsByClassName("overlay" + type)[0]
        .getBoundingClientRect();
      units.push({
        id: units[0] ? units[units.length - 1].id + 1 : 1,
        type: type,
        x: position.left, //converting page x position to canvas x
        y: 0,
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
      units.forEach(function(unit) {
        let newData = document.getElementById("item" + String(unit.id));
        unit.x = newData.getAttribute("data-x")
          ? Number(newData.getAttribute("data-x"))
          : unit.x;
        unit.y = newData.getAttribute("data-y")
          ? Number(newData.getAttribute("data-y"))
          : unit.y;
      });
      return units;
    },
  },
};
