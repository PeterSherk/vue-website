import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'
import About from '../views/About.vue'
import Coding from '../components/Coding.vue'
import Cooking from '../components/Cooking.vue'
import Music from '../components/Music.vue'
import Project from '../components/Project.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/coding',
    name: 'coding',
    component: Coding
  },
  {
    path: '/cooking',
    name: 'cooking',
    component: Cooking
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  },
  {
    path: '/projects/:projectId',
    name: 'projects',
    component: Project
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  }
})

export default router
