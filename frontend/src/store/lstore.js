import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: [],
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user" || null),
        userimg: localStorage.getItem("userimg" || null),
        expired: localStorage.getItem("expired" || null),
        logged: localStorage.getItem("logged" || false),

        snackbar: {
            show: false,
            text: ''
        },
        permissions: [],
        avmodules: null
    },

    mutations: {
        setCredential(state, token) {
            // set token
            localStorage.setItem("token", token);

            // set user
            let user = jwt.decode(token, process.env.VUE_APP_DJ_SECRET_KEY)
            localStorage.setItem("username", user.username)

            // set expired date
            localStorage.setItem("expired", user.exp)
            console.log("expired " + localStorage.getItem("expired"));

            // set axios headers
            this.setAxiosHeaders();
        },

        setAxiosHeaders() {
            // axios header set
            axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');
        },

        setUser(state) {
            let data = jwt.decode(state.token, process.env.VUE_APP_DJ_SECRET_KEY)
            console.log("set user data : " + JSON.stringify(data))
            localStorage.setItem("user", data.username)
        },

        logout(state) {
            console.log("Logged out ");
            state.token = "";
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

        showmsg(state, payload) {
            state.snackbar.text = payload.text;
            state.snackbar.show = payload.show
        },

    },

    actions: {
        async login({commit}, loginData) {
            try {
                let response = (await axios.post("http://127.0.0.1:8000/auth/login/", loginData));
                let token = response.data.token

                commit('setCredential', token)

                commit('showmsg', {text: 'Giriş yapıldı !', show: true})
            } catch (e) {
                commit('showmsg', {text: 'Giriş yapılamadı !' + e, show: true})
            }

        },

        async logoutserv({commit}) {
            await commit('logout')
        }
    }
})
