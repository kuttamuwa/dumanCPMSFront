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
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },

    {
        path: "/tests",
        name: "test",
        component: () => import('../views/Tests')
    },
]

const router = new VueRouter({
    routes
})

export default router
