import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: [],
        token: localStorage.getItem("token") || null,
        user: localStorage.getItem("user") || null,
        userimg: localStorage.getItem("userimg") || null,
        expired: localStorage.getItem("expired") || null,
        logged: localStorage.getItem("logged") || false,

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
            this.state.token = token;

            // set user
            let user = jwt.decode(token, process.env.VUE_APP_DJ_SECRET_KEY)
            localStorage.setItem("user", user.username)
            this.state.user = user.username

            // set expired date
            localStorage.setItem("expired", user.exp)
            this.state.expired = user.exp
            // console.log("expired " + localStorage.getItem("expired"));

            // set axios headers
            axios.defaults.headers.common['Authorization'] = 'JWT ' + token;

            // log state
            this.state.logged = true;

            // console.log("Everything set : \n")
            console.log("after set :" + this.state.user)
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

        getCredentialstate(state) {
            return state.user
        }

    },

    actions: {
        async login({commit}, loginData) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/auth/login/", loginData);
                let token = response.data.token

                commit('setCredential', token)
                let user = this.state.user

                console.log("user : " + JSON.stringify(user))
                // console.log("user2 : " + JSON.stringify(user2))

                commit('showmsg', {text: 'Giriş yapıldı !', show: true})
                return user

            } catch (e) {
                commit('showmsg', {text: 'Giriş yapılamadı !' + e, show: true})
            }

        },

        async logoutserv({commit}) {
            await commit('logout')
        }
    }
})
