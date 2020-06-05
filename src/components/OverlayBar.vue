<template>
  <div v-bind:class="'overlay ' + position">
    <div
      v-for="item in items"
      :key="item.id"
      v-bind:class="item.className ? 'overlayObject ' + item.className : 'overlayObject'"
      v-on:click="item.onClick ? item.onClick($event) : null"
      :id="item.name ? 'overlay' + item.name : null"
    >{{item.name}}</div>
  </div>
</template>
<script>
export default {
  name: "OverlayBar",
  props: {
    autoWidth: Boolean,
    className: String,
    items: Array, //Requrires name, id and onchange
    position: String
  },
  mounted() {
    if (this.autoWidth) this.updateWidth();
  },
  updated() {
    if (this.autoWidth) this.updateWidth();
  },
  methods: {
    updateWidth: function() {
      let elements = document.querySelectorAll(".left,.right,.center");
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.width = this.items.length * 10 + "%";
        if (document.getElementsByClassName("right"))
          elements[i].style.marginLeft = 100 - this.items.length * 10 + "%";
      }
    }
  }

  /*components: {
    Unit,
  },*/
};
</script>

<style scoped lang="scss">
$height: 8;
.overlay {
  position: absolute;
  width: 100%;
  height: percentage($height/100);
  background-color: rgba(255, 255, 255, 0.6);
  height: auto;
  z-index: 20000;
  display: flex;
  align-items: center;
}
.overlayObject {
  border: 1px solid rgba(136, 136, 136, 0.5);
  vertical-align: middle;
  margin: auto;
  font-size: ($height + vh);
  cursor: pointer;
  width: 100%;
}

.bottom {
  bottom: 0;
}
.left {
  margin-left: 0%;
  width: 30%;
}
.right {
  margin-left: 70%;
  width: 30%;
}
.center {
  margin-left: 35%;
  width: 30%;
}

.overlayShape {
  background-color: rgba(255, 255, 255, 0.6);
  width: $height * 32 + px;
  height: $height * 8 + px;
}
.overlayCircle {
  border-radius: 100%;
}
</style>
