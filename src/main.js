import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

const axios = require('axios');

function fetchData() {
  // you might need the next line, depending on your API provider.
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.post('api.example.com', {/* here you can pass any parameters you want */})
  .then((response) => {
    // Here you can handle the API response
    // Maybe you want to add to your HTML via JavaScript?
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
}


// call the function to start executing it when the page loads inside Electron.
fetchData();