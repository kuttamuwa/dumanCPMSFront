import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";
import CheckAccount from "@/views/CheckAccount";


Vue.use(Vuex);

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
            let data = jwt.decode(state.token, "d_hy!@)01pkm38_tgq$r_n&yyxft%1$7#r8iih5$!gnnjj_=wj")
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
            console.log("login geldi")
            let response = (await axios.post("http://127.0.0.1:8000/auth/login/", loginData));
            let token = response.data.token
            commit("setToken", token)
            commit("setUser", token);

            axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

            // mesaj test
            commit('showmsg', {text: 'Giriş yapıldı !', show: true})
        },

    }
})
