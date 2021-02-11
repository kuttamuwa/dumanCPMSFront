import Vue from 'vue'
import VueRouter from 'vue-router'

// site views
import Home from '../views/Home.vue'
import lstore from "@/store/lstore";
// modules


Vue.use(VueRouter)


const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import('../views/Login.vue'),
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
        beforeEnter(to, from, next) {
            if (lstore.state.logged !== "true") {
                console.log("logine gitmeden önce")
                next('/login')
            } else {
                next()
            }
        }
    },

    {
        path: '/checkaccount',
        name: 'CheckAccount',
        component: () => import('../views/CheckAccount'),
        beforeEnter(to, from, next) {
            if (lstore.state.logged !== "true") {
                next('/login')
            } else {
                next()
            }
        }
    },

    {
        path: "/riskanalysis",
        name: "RiskAnalysis",
        component: () => import('../views/RiskAnalysis'),
        beforeEnter(to, from, next) {
            if (lstore.state.logged !== "true") {
                next('/login')
            } else {
                next()
            }
        }
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
