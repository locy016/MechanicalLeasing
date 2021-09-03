import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { topShow: false }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { topShow: true }
  },
  {
    path: '/info-mgr',
    name: 'info-mgr',
    component: () => import('../views/info-mgr/index.vue'),
    meta: { topShow: true }
  },
  {
    path: '/template-mgr',
    name: 'template-mgr',
    component: () => import('../views/info-mgr/template-mgr.vue'),
    meta: { topShow: true }
  },
  {
    path: '/devi-mgr',
    name: 'devi-mgr',
    component: () => import('../views/devi-mgr/index.vue'),
    meta: { topShow: true }
  },
  {
    path: '/cust-mgr',
    name: 'cust-mgr',
    component: () => import('../views/cust-mgr/index.vue'),
    meta: { topShow: true }
  },
  {
    path: '/noti-mgr',
    name: 'noti-mgr',
    component: () => import('../views/noti-mgr/index.vue'),
    meta: { topShow: true }
  },
  {
    path: '/new-noti',
    name: 'new-noti',
    component: () => import('../views/noti-mgr/new-noti.vue'),
    meta: { topShow: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
