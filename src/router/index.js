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
        component: () => import('@/views/store/StoreHome')
      },
      {
        path: 'list',
        name: 'StoreList',
        component: () => import('@/views/store/StoreList')
      },
      {
        path: 'detail',
        name: 'StoreDetail',
        component: () => import('@/views/store/StoreDetail')
      },
      {
        path: 'shelf',
        name: 'StoreShelf',
        component: () => import('@/views/store/StoreShelf')
      },
      {
        path: 'category',
        name: 'StoreCategory',
        component: () => import('@/views/store/StoreCategory')
      },
      {
        path: 'speaking',
        name: 'StoreSpeaking',
        component: () => import('@/views/store/StoreSpeaking')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
