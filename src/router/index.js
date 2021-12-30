import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostPage from '../components/PostPage.vue'


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
    path: '/Post/:id',
    name: 'PostPage',
    component: PostPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
