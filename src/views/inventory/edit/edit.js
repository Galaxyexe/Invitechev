import FormObject from "../../../components/FormObject.vue";
import {
  beforeRouteLeave,
  validateForm,
} from "../../../components/formFunctions.js";
import router from "../../../router";

export default {
  name: "EditInventory",
  props: {
    editedItems: Array,
    totalItems: Array,
    immediate: Boolean,
  },
  components: {
    FormObject,
  },
  data() {
    return { disabled: false };
  },
  created() {
    let editedItems = this.editedItems;
    window.onbeforeunload = () => "Are you sure you want to leave?";

    //TODO only done if immediate === YES
    if (!editedItems) router.push("/inventory/items");
    editedItems = editedItems.map((element, index) => [
      {
        //id: index * 2,
        value: element.name,
        check: this.uniqueName,
        type: String,
        form: "input",
        originalName: element.name,
      },
      { id: index * 2 + 1, value: element.amount, type: Number, form: "input" },
    ]);
    this.editedItems = editedItems;
  },
  methods: {
    determineDisabled() {
      console.log(!validateForm(this.editedItems, true));
      return !validateForm(this.editedItems, true);
    },
    uniqueName(item) {
      //move this server side eventually, but interesting to have here
      const name = item.name;
      const originalName = item.originalName;
      if (name === originalName) return true;
      for (const otherItem of this.totalItems) {
        if (name === otherItem.name) {
          item.error = "Name not unique!";
          return true;
        }
      }
    },
    validateForm,
  },
  beforeRouteLeave,
};
