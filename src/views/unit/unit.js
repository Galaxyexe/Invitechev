import interact from "interactjs";
//import Vue from "vue";
import * as listeners from "./functions/listeners.js";
export default {
  name: "Unit",
  props: {
    type: String,
    id: String,
    x: Number,
    y: Number,
    onDelete: Function,
  },
  data() {
    let timer = null;
    let translate =
      "translate(" + String(this.x) + "px, " + String(this.y) + "px)";
    return {
      translate,
      timer,
    };
  },
  async mounted() {
    const item = document.getElementById("item" + +String(this.id));
    item.setAttribute("data-x", this.x);
    item.setAttribute("data-y", this.y);
    document.getElementById(
      "item" + String(this.id)
    ).style.webkitTransform = this.translate;
    interact(item)
      .draggable({
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.getElementById("container"),
            endOnly: true,
          }),
          interact.modifiers.snap({
            targets: [interact.createSnapGrid({ x: 20, y: 20 })],
            range: Infinity,
          }),
        ],
        autoScroll: true,
        listeners: {
          move: listeners.dragMoveListener.bind(this),
          start: listeners.dragMoveListener.bind(this),
          end: listeners.dragEndListener.bind(this),
        },
      })
      .resizable({
        edges: {
          top: true,
          left: true,
          right: true,
          bottom: true,
        },
        snapEdges: {
          targets: [interact.snappers.grid({ x: 20, y: 20 })],
        },
        onmove: listeners.resizeMoveListener.bind(this),
        //onend: listeners.resizeEndListener.bind(this),
        invert: "none",
        modifiers: [
          interact.modifiers.snapSize({
            targets: [interact.createSnapGrid({ width: 20, height: 20 })],
          }),
          interact.modifiers.restrictSize({
            min: { width: 60, height: 60 },
          }),
        ],
      });

    // this function is used later in the resizing and gesture demos
  },
};
