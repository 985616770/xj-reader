import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    name: 'Ebook',
    component: () => import('@/views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('@/components/ebook/EbookReader')
      }
    ]
  },
  {
    path: '/store',
    name: 'Store',
    redirect: '/store/home',
    component: () => import('@/views/store/index'),
    children: [
      {
        path: 'home',
        name: 'StoreHome',
        component: () => import('@/views/store/StoreHome')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
