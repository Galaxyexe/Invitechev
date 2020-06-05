<template>
  <form>
    <input type="text" placeholder="Search.." name="search" v-model="input" />
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    onChange: Function,
    submit: Boolean //TODO Should the form have a submit button?
  },
  data() {
    let input = "";
    return { input };
  },
  watch: {
    input: function(val, oldVal) {
      if (val != oldVal) this.onChange(val);
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
