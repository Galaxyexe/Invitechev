import interact from "interactjs";
//import Vue from "vue";
import * as listeners from "../../functions/listeners.js";
export default {
  name: "Unit",
  props: {
    type: String,
    id: String,
    x: Number,
    y: Number,
    onDelete: Function
  },
  methods: {
    handleUp: function () {
      this.drag = false;
      setTimeout(() => (this.drag = true), 250); //this would move this assigment at the end of event queue
    },
    handleClick: function () {
      if (!this.drag) {
        this.clicked = !this.clicked;
      }
    }
  },
  data() {
    let clicked = false;
    let timer = null;
    let translate =
      "translate(" + String(this.x) + "px, " + String(this.y) + "px)";
    return {
      translate,
      clicked,
      timer
    };
  },
  async mounted() {
    const item = document.getElementById("item" + +String(this.id));
    item.setAttribute("data-x", this.x);
    item.setAttribute("data-y", this.y);
    document.getElementById("item" + String(this.id)).style.webkitTransform =
      this.translate;
    interact(item)
      .draggable({
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.getElementById("container"),
            endOnly: true
          }),
          interact.modifiers.snap({
            targets: [
              interact.createSnapGrid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
        ],
        autoScroll: true,
        listeners: {
          move: listeners.dragMoveListener.bind(this),
          start: listeners.dragMoveListener.bind(this),
          end: listeners.dragEndListener.bind(this)
        }
      })
      .resizable({
        edges: {
          top: ".resize-top",
          left: ".resize-left",
          bottom: ".resize-bottom",
          right: ".resize-right"
        },
        invert: "reposition",
        onmove: listeners.resizeMoveListener.bind(this),
        onend: listeners.resizeEndListener.bind(this),
        modifiers: [
          interact.modifiers.snapSize({
            targets: [
              { width: 100, height:100 },
              interact.createSnapGrid({ width: 50, height: 50 })
            ]
            
          }),
          interact.modifiers.restrictSize({
            min: { width: 100, height: 100 },
          })
        ]
      });


    // this function is used later in the resizing and gesture demos
  }
};