import Vue from 'vue'
import VueRouter from 'vue-router'

// site views
import Home from '../views/Home.vue'

// modules


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/checkaccount',
        name: 'CheckAccount',
        component: () => import('../views/CheckAccount')
    },

    {
        path: "/riskanalysis",
        name: "RiskAnalysis",
        component: () => import('../views/RiskAnalysis')
    },

    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import('../views/Dashboard')
    },

    {
        path: "/tests",
        name: "test",
        component: () => import('../views/Tests')
    },

    {
        path: "/guide",
        name: "Guide",
        component: () => import('../views/Guide')
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName:
    "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
