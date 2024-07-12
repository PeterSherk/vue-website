import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/About.vue')
	},
	{
		path: '/coding',
		name: 'coding',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../components/Coding.vue')
	},
	{
		path: '/cooking',
		name: 'cooking',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../components/Cooking.vue')
	},
	{
		path: '/music',
		name: 'music',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../components/Music.vue')
	},
	{
		path: '/projects/:projectId',
		name: 'projects',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../components/Project.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/PageNotFound.vue')
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				left: 0,
				top: 0
			}
		}
	}
})

export default router
