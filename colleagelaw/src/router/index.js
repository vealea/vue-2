import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('../views/Maintwo.vue')
const admin = () => import('../views/Administratorslist.vue')
const treelist = () => import('../views/treelist.vue')
const xiaoyou = () => import('../views/xiaoyouzhuce.vue')
const login = () => import('../views/login.vue')
const guanli = () => import('../views/guanliyuanzhuce.vue')
const user = () => import('../views/xiaoyoulist.vue')
const center = () => import('../views/center.vue')
const trea = () => import('../views/guanlitreelist.vue')
const centa = () => import('../views/guanlicente.vue')

import refresh from '../views/refresh.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/refresh',
      name: 'refresh',
      component: refresh
    },
    {
      path: '',
      name: 'wu'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/Main',
      component: Main,
      children: [
        {
          path: '/trealist',
          name: 'trea',
          component: trea
        },
        {
          path: '/administratorslist',
          name: 'admin',
          component: admin
        },
        {
          path: '/treelist',
          name: 'tree',
          component: treelist
        },
        {
          path: '/xiaoyou',
          name: 'xiaoyou',
          component: xiaoyou
        },
        {
          path: '/guanlicen',
          name: 'guanlicen',
          component: centa
        },
        {
          path: '/guanliyuan',
          name: 'guanli',
          component: guanli
        },
        {
          path: '/user',
          name: 'user',
          component: user
        },
        {
          path: '/center',
          name: 'center',
          component: center
        }
      ]
    }
  ]
}
)
