import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/views/User/MapPage'
import Informations from '@/views/User/Informations'
import Points from '@/views/Admin/Points'
import Point from '@/views/Admin/Point'
import Connection from '@/views/Admin/Connection'

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
      path: '/connexion',
      name: 'Connection',
      component: Connection,
      alias: '/admin'

    },
    {
      path: '/admin/points',
      name: 'AdminPoints',
      component: Points
    },
    {
      path: '/admin/point/:type/:id',
      name: 'AdminPointUpdate',
      component: Point
    },
    {
      path: '/admin/point/:type',
      name: 'AdminPoint',
      component: Point
    }

  ]
})
