import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import { store } from './store';

Vue.use(Vuex)
Vue.use(BootstrapVue);
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
