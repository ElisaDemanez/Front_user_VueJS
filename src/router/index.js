import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/MapPage'
import Informations from '@/views/Informations'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'MapPage',
      component: MapPage,
      alias: '/'
    },
    {
      path: '/informations',
      name: 'Informations',
      component: Informations
    }
  ]
})
