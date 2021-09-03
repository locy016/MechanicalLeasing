import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/global.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

const { ipcRenderer } = window.require('electron')
Vue.prototype.ipcRenderer = ipcRenderer

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
