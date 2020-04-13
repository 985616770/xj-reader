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
    redirect: '/store/shelf',
    component: () => import('@/views/store/index'),
    children: [
      {
        path: 'home',
        name: 'StoreHome',
        meta: { index: 1 },
        component: () => import('@/views/store/StoreHome')
      },
      {
        path: 'list',
        name: 'StoreList',
        meta: { index: 2 },
        component: () => import('@/views/store/StoreList')
      },
      {
        path: 'detail',
        name: 'StoreDetail',
        meta: { index: 3 },
        component: () => import('@/views/store/StoreDetail')
      },
      {
        path: 'shelf',
        name: 'StoreShelf',
        meta: { index: 2 },
        component: () => import('@/views/store/StoreShelf')
      },
      {
        path: 'category',
        name: 'StoreCategory',
        meta: { index: 2 },
        component: () => import('@/views/store/StoreCategory')
      },
      {
        path: 'speaking',
        name: 'StoreSpeaking',
        meta: { index: 3 },
        component: () => import('@/views/store/StoreSpeaking')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
