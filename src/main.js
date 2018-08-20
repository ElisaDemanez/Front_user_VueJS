
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify)

Vue.config.productionTip = false


const shared = {
  lang: "fr"
}

shared.install = function(){
  Object.defineProperty(Vue.prototype, '$lang', {
    get () { return shared }
  })
}

Vue.use(shared);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
  
  },
  components: { App },
  template: '<App/>'
})
