import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


//样式重置
import 'assets/reset.css'
import 'assets/stylus/border.styl'
import Aplayer from 'vue-aplayer'
new Vue({
  router,
  store,
  components: {
      Aplayer,
  },
  render: h => h(App)
}).$mount('#app')
