<template>
  <form>
    <h1>{{name}} Form</h1>
    <div v-for="field in fields" v-bind:key="field.name">
      <div v-if="field.type == 'input'" class="form-group">
        <label class="pageText">{{field.name}}</label>
        <input
          v-bind:value="field.value"
          v-bind:placeholder="field.placeholder"
          class="form-control"
          @change="this.handleString(field)"
        />
        <!-- TODO change needs to change! -->
        <div class="alert alert-danger">{field.error}</div>
      </div>
    </div>
    <button v-bind:disabled="validateForm(this.fields)">Submit</button>
  </form>
</template>

<script>
export default {
  name: "Form",
  props: {
    fields: Array,
    //Each field should have a name, type and more to be added
    name: String,
    onSubmit: Function
  },
  methods: {
    handleString(field) {
      if (field.type == "Number")
        field.error = int(field.value) ? null : "Not a valid number!";
      if (field.check) field.check(field.value);
    },
    validateForm(fields) {
      //TODO doesn't account for no validation at the beginning
      for (field of fields) {
        if (field.error != null) return true;
      }
      return false;
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
