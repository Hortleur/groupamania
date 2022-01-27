import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFoundComponent from '../components/NotFoundComponent.vue'



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
    component: () => import('../components/PostPage.vue')
  },
  {
    path:'/Admin',
    name:'Admin',
    component: () => import('../views/Admin.vue')
  },
  { 
    path: '/:catchAll(.*)', 
    component: NotFoundComponent,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
