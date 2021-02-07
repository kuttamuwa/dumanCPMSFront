import Vue from 'vue'
import VueRouter from 'vue-router'
// site views
import Home from '../views/Home.vue'
// modules


Vue.use(VueRouter)

// Route guard
const requireAuth = (to, from, next) => {
    const user = localStorage.getItem("user")
    console.log("guard : " + user)
    if (!user) {
        next({name: "Login"})
    } else {
        next()
    }
}


const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import('../views/Login.vue'),
    },

    {
        path: "/logout",
        name: "Logout",
        component: () => import('../views/Logout.vue')
    },

    {
        path: "/forgetpwd",
        name: "ForgetPwd",
        component: () => import('../views/ForgetPwd.vue')
    },

    {
        path: '/',
        name: 'Home',
        component: Home,
        // beforeEnter: requireAuth
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
        path: "/admin",
        name: "Admin",
        component: () => import('../views/Admin.vue')
    },

    {
        path: "/test",
        name: "Tests",
        component: () => import('../views/Tests')
    }
]

const router = new VueRouter({
    routes
})

export default router
