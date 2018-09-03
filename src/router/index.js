import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/User/MapPage'
import Informations from '@/views/User/Informations'
import Admin from '@/views/Admin/Admin'



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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
