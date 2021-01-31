import Vue from 'vue'
import VueRouter from 'vue-router'
import lstore from "@/store/lstore";
// site views
import Home from '../views/Home.vue'
import axios from "axios";
import CheckAccount from "@/views/CheckAccount";
// modules


Vue.use(VueRouter)

// Route guard
const requireAuth = (to, from, next) => {
    const user = localStorage.getItem("user")
    checkPermission();
    checkPermission();
    console.log("guard : " + user)
    if (!user) {
        next({name: "Login"})
    } else {
        next()
    }
}

function checkPermission() {
    // try {
    //     CheckAccount.methods.getDataFromApi();
    // } catch (e) {
    //     console.log("Hata : " + e)
    // }


    const PERM_API = "http://127.0.0.1:8000/appconfig/getperms/"
    // const response = axios.get(PERM_API)
    // console.log(response)
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
        path: "/test",
        name: "test",
        component: () => import('../views/Tests.vue')
    },

    {
        path: "/login",
        name: "Login",
        component: () => import('../views/Login.vue'),
    },

    {
        path: "/logout",
        name: "Logout",
        component: () => import('../views/Logout')
    }
]

const router = new VueRouter({
    routes
})

export default router
