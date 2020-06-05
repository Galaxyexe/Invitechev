<template>
  <div v-if="this.field.form == 'input'" class="form-group">
    <label class="pageText">{{field.name}}</label>
    <input v-model="field.value" v-bind:placeholder="field.placeholder" class="form-control" />
    <!-- TODO change needs to change! -->
    <div class="alert alert-danger">{{field.error}}</div>
  </div>
</template>

<script>
export default {
  name: "FormObject",
  props: {
    field: Object,
    onError: Function
    //Each field should have a name, type and more to be added
  },
  methods: {
    handleString() {
      const field = this.field;
      const prevError = field.error;
      if (field.type === Number)
        field.error =
          field.value !== "" && Number.isInteger(Number(field.value))
            ? null
            : "Not a valid number!";
      if (field.type === String) {
        field.error = field.value != "" ? null : "Not a valid string!";
      }
      if (field.check) field.check(field);
      if (field.error != prevError) {
        this.$emit("updateField", field);
      }
    }
  },
  watch: {
    "field.value": function() {
      const field = this.field;
      if (field.form === "input") this.handleString();
    }
  }
};

/*components: {
    Unit,
  },*/
</script>

<style scoped lang="scss">
input {
  width: 90%;
  color: black;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1vh;
  border-radius: 5px;
  font-size: 2vw;
}
</style>
