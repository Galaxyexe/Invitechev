import FormObject from "../../../components/FormObject.vue";
import {
  beforeRouteLeave,
  validateForm,
} from "../../../components/formFunctions.js";
export default {
  name: "Shipment",
  components: {
    FormObject,
  },
  data() {
    return { disabled: true, items: [] };
  },
  methods: {
    addItem() {
      this.items.push(
        {
          value: "",
          type: String,
          form: "input",
        },
        { value: "", type: Number, form: "input" }
      );
    },
    deleteItem(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) this.items.splice(index, 1);
    },
    determineDisabled() {
      return !validateForm(this.items, false);
    },

    validateForm,
  },
  beforeRouteLeave,
};
