import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";


Vue.use(Vuex);

process.DJ_SECRET_KEY = undefined;
export default new Vuex.Store({
    state: {
        messages: [],
        token: localStorage.getItem("token") || "",
        user: localStorage.getItem("user" || null),
        snackbar: {
            show: false,
            text: ''
        },
        permissions: [],
        avmodules: null
    },

    mutations: {
        setToken(state, token) {
            localStorage.setItem("token", token);
        },

        setUser(state) {
            let data = jwt.decode(state.token, process.env.VUE_APP_DJ_SECRET_KEY)
            localStorage.setItem("user", data.username)
        },

        logout(state) {
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
            try{
                let response = (await axios.post("http://127.0.0.1:8000/auth/login/", loginData));
                let token = response.data.token
                commit("setToken", token)
                commit("setUser", token);

                axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

                commit('showmsg', {text: 'Giriş yapıldı !', show: true})
            } catch (e) {
                commit('showmsg', {text: 'Giriş yapılamadı !' + e, show: true})
            }

        },

    }
})
