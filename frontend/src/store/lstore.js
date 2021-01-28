import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: [],
        token: localStorage.getItem("token") || "",
        user: null,
        snackbar: {
            show: false,
            text: ''
        }
    },

    mutations: {
        setUser(state) {
            let data = jwt.decode(state.token, "d_hy!@)01pkm38_tgq$r_n&yyxft%1$7#r8iih5$!gnnjj_=wj")
            state.user = data.username;
            console.log("user setledim : " + state.user)
        },

        auth(state, token) {
            state.token = token;

        },

        logout(state) {
            state.token = "";
            localStorage.removeItem("token");
            state.user = null;
        },

        showmsg(state, payload) {
          state.snackbar.text = payload.text;
          state.snackbar.show = payload.show
        }

    },

    actions: {
        // async register({commit}, registerData) {
        //     let token = (await axios.post("http://localhost:3000/register", registerData)).data;
        //     localStorage.setItem("token", token);
        //     axios.defaults.headers.common["Authorization"] = token;
        //     commit("auth", token);
        // },

        async login({commit}, loginData) {
            console.log("login geldi")
            let response = (await axios.post("http://127.0.0.1:8000/auth/login/", loginData));
            let token = response.data.token
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth", token);
            commit("setUser", token);

            // mesaj test
            commit('showmsg', {text: 'benim mesajim', show: true})
        },
    }
})
