<template>
  <div
    class="item"
    :id="'item' + String(id)"
    v-on:click="handleClick()"
    @mousedown="handleUp()"
    v-bind:class="{ unitCircle: type=='Circle'}"
  >
    <div class="resize-top resize-left" v-if="clicked==true"></div>
    <div class="resize-bottom resize-left" v-if="clicked==true"></div>

    <!-- bottom-right resize handle -->
    <div class="resize-top resize-right" v-if="clicked==true"></div>

    <div class="resize resize-bottom resize-right" v-if="clicked==true"></div>
    <div class="rotation-handle" :id="'handle'+String(id)">
      <div class="rotation-object" v-if="clicked==true">&circlearrowright;</div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
//import Vue from "vue";
import * as listeners from "../functions/listeners.js";
export default {
  name: "Unit",
  props: {
    type: String,
    id: String,
    x: Number,
    y: Number,
    rotation: Number,
    onDelete: Function
  },
  methods: {
    handleUp: function() {
      this.drag = false;
      setTimeout(() => (this.drag = true), 250); //this would move this assigment at the end of event queue
    },
    handleClick: function() {
      if (!this.drag) {
        this.clicked = !this.clicked;
        let el = document.getElementById("handle" + String(this.id));
        if (this.clicked == true) {
          el.style.width = "100%";
          el.style.height = "100%";
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.clicked = false;
            let el = document.getElementById("handle" + String(this.id));
            el.style.width = "0%";
            el.style.height = "0%";
          }, 3000);
        } else {
          let el = document.getElementById("handle" + String(this.id));
          el.style.width = "0%";
          el.style.height = "0%";
        }
      }
    }
  },
  data() {
    let clicked = false;
    let timer = null;
    let translate =
      "translate(" + String(this.x) + "px, " + String(this.y) + "px)";
    let rotate = "rotate(" + this.rotation + "rad)";
    return {
      translate,
      rotate,
      clicked,
      timer
    };
  },
  async mounted() {
    const item = document.getElementById("item" + +String(this.id));
    item.setAttribute("data-x", this.x);
    item.setAttribute("data-y", this.y);
    document.getElementById("item" + String(this.id)).style.webkitTransform =
      this.translate + this.rotate;
    const rotationItem = document.getElementById("handle" + String(this.id));
    interact(item)
      .draggable({
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: document.getElementById("container"),
            endOnly: true
          })
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
        onend: listeners.resizeEndListener.bind(this)
      });
    interact(rotationItem).draggable({
      onstart: listeners.rotateStartListener,
      onmove: listeners.rotateMoveListener.bind(this),
      onend: listeners.rotateEndListener
    });

    // this function is used later in the resizing and gesture demos
  }
};
</script>

<style scoped src="../css/Unit.scss" lang="scss"/>
