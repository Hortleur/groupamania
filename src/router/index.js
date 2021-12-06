import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Profile from '../views/Profile'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/Post',
    name:'Post',
    component: Post
  },
  {
    path: '/Profile',
    name:'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
