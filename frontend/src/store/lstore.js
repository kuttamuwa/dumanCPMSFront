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
        avmodules: null,

        ca_create_dialog: false
    },

    mutations: {
        checkPermission (state) {
            const ACCOUNT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/?format=json";

            try {
                axios.get(ACCOUNT_API)

            } catch (e) {
                let statuscode = e.response.status
                if (statuscode === 401) {
                    this.$store.commit("showmsg", {text: "Uzun zamandır işlem yapmadınız, lütfen tekrar giriş yapınız", show: true})
                    this.$store.commit('logout');
                }
            }
        },

        ca_create_dialog_true(state) {
            this.state.ca_create_dialog = true;
        },

        ca_create_dialog_false(state) {
            this.state.ca_create_dialog = false
        },

        setAvatar(state, username) {
            const AVATAR_API = "http://127.0.0.1:8000/appconfig/getavatar/" + username
            console.log("avatar api : " + AVATAR_API)

            try {
                const response = axios.get(AVATAR_API)
                if (response.status === 200) {
                    let avatar = response.data;
                    console.log("Avatar : " + avatar)
                }
            } catch (e) {

            }
        },

        setCredential(state, token) {
            // set token
            localStorage.setItem("token", token);
            this.state.token = token;

            // set user
            let user = jwt.decode(token, process.env.VUE_APP_DJ_SECRET_KEY)
            localStorage.setItem("user", user.username)
            this.state.user = user.username

            // set avatar
            // this.setAvatar(user)

            // set expired date
            localStorage.setItem("expired", user.exp)
            this.state.expired = user.exp
            // console.log("expired " + localStorage.getItem("expired"));

            // set axios headers
            axios.defaults.headers.common['Authorization'] = 'JWT ' + token;

            // log state
            localStorage.setItem("logged", "true");

            // console.log("Everything set : \n")
            console.log("after set :" + this.state.user)
        },

        removeCredential(state) {
            // set token
            localStorage.removeItem("token");
            this.state.token = null

            // set user
            localStorage.removeItem("user")
            this.state.user = null

            // set expired date
            localStorage.removeItem("expired")
            this.state.expired = null

            // log state
            localStorage.setItem("logged", "false");
            this.state.logged = "false";

            console.log("after set :" + this.state.user)
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

        async logout({commit}) {
            try {
                commit('removeCredential')

            } catch (e) {
                commit('showmsg', {text: "Çıkış yapılamadı !" + e, show: true})
            }
        },

        async logoutserv({commit}) {
            await commit('logout')
        }
    }
})
