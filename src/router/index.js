import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/Post',
    name:'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/Profile',
    name:'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/PostPage',
    name: 'PostPage',
    component: () => import('../views/PostPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
