import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/User/MapPage'
import Informations from '@/views/User/Informations'
import Admin from '@/views/Admin/Admin'
import Points from '@/views/Admin/Points'
import Point from '@/views/Admin/Point'





Vue.use(Router)

export default new Router({
  routes: [{
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
    },
    {
      path: '/admin/points',
      name: 'AdminPoints',
      component: Points
    },
    {
      path: '/admin/point/:id',
      name: 'AdminPointUpdate',
      component: Point
    },
    {
      path: '/admin/point',
      name: 'AdminPoint',
      component: Point
    }
    
  ]
})
