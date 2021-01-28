import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "@/router";
import Vuex from 'vuex';
import store from './store/lstore';

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(Vuex);

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
