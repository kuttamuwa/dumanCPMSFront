import Vue from 'vue'
import VueRouter from 'vue-router'
import lstore from "@/store/lstore";
// site views
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Logout from "@/views/Logout";

// modules


Vue.use(VueRouter)

// Route guard
const requireAuth = (to, from, next) => {
    const user = lstore.state.user;
    if (!user) {
        next({name: "Login"})
    } else {
        next()
    }
}

const checkPermission = () => {

}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/checkaccount',
        name: 'CheckAccount',
        component: () => import('../views/CheckAccount'),
        beforeEnter: requireAuth
    },

    {
        path: "/riskanalysis",
        name: "RiskAnalysis",
        component: () => import('../views/RiskAnalysis'),
        beforeEnter: requireAuth
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

    {
        path: "/login",
        name: "Login",
        component: Login,
    },

    {
        path:"/logout",
        name: "Logout",
        component: Logout
    }
]

const router = new VueRouter({
    routes
})

export default router
