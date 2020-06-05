import Items from "./items/Items.vue";
import Shipment from "./shipment/Shipment.vue";
import OverlayBar from "../../components/OverlayBar.vue";
import router from "../../router";

//TODO: Add multiple stores for chain eventually
export default {
  name: "Inventory",
  props: {
    screen: String,
  },
  components: {
    Items,
    Shipment,
    OverlayBar,
  },
  data() {
    let items = [
      {
        name: "Bananas",
        amount: 100,
      },
      {
        name: "Apples",
        amount: 5,
      },
      {
        name: "Blueberries",
        amount: 22,
      },
    ];
    let overlayItems = [
      {
        id: 0,
        name: "Items",
        onClick: function() {
          router.push("/inventory/items");
        },
      },
      {
        id: 1,
        name: "Shipment",
        onClick: function() {
          router.push("/inventory/shipment");
        },
      },
    ];
    return {
      items,
      overlayItems,
    };
  },
};
