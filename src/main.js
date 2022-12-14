import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import store from "./store/index.js"
import './plugins/element.js'
Vue.config.productionTip = false


new Vue({
  store, 
  render: h => h(App),
}).$mount('#app')
