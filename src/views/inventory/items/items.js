import SearchBar from "../../../components/SearchBar.vue";

//TODO: Add multiple stores for chain eventually
export default {
  name: "Items",
  props: {
    items: Array,
  },
  components: {
    SearchBar,
  },
  data() {
    let sortedItems = this.items;
    this.sortItems("name", sortedItems);
    let options = ["name", "amount", "edit"];
    return {
      options,
      sortedItems,
    };
  },
  methods: {
    disableEdit() {
      for (const item of this.items) {
        if (item.checked === true) return false;
      }
      return true;
    },
    getSelected() {
      let selected = [];
      for (const item of this.sortedItems) {
        if (item.checked) selected.push(item);
      }
      console.log(selected);
      return selected;
    },
    paginateItems(value) {
      let sortedItems = [];
      for (const item of this.items) {
        if (item.name.toLowerCase().includes(value.toLowerCase()))
          sortedItems.push(item);
      }
      this.sortedItems = sortedItems;
    },
    sortItems(option, items) {
      if (!items) items = this.sortedItems;
      if (option == this.sortOption) {
        items = items.reverse();
      } else if (option == "name")
        items.sort(function(a, b) {
          //TODO: Alphabetizes for now
          return a[option] < b[option] ? -1 : a[option] > b[option] ? 1 : 0;
        });
      else if (option == "amount") {
        items.sort(function(a, b) {
          //TODO: Alphabetizes for now
          return a[option] - b[option];
        });
      }
      this.sortOption = option;
      this.sortedItems = items;
    },
  },
};
