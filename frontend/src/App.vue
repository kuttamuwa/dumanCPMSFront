<template>
  <v-app id="inspire" v-if="kullanici !== null">
    <v-navigation-drawer
        v-model="drawer"
        app
        dark
        expand-on-hover
    >

      <v-img src="DUMANARGE.jpg"></v-img>

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img v-model="kullanici_img"></v-img>
        </v-list-item-avatar>

        <v-list-item-title v-text="kullanici"></v-list-item-title>

        <v-btn
            icon
            @click="pushAdmin"
        >
          <v-icon>mdi-chess-rook</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"

            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-icon></v-icon>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="primary"
        dark
        src="palm-2445110_1920.jpg"
        scroll-target="#scrolling-techniques-2"
        @click="drawer = !drawer"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>360 Müşteri Performans Yönetim Platformu</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-card-title>{{ kullanici }}</v-card-title>
      <v-btn @click="logout">
        <v-icon> mdi-logout</v-icon>
        Çıkış Yap
      </v-btn>
    </v-app-bar>

    <v-main>
      <msg-component/>
      <router-view></router-view>
    </v-main>
  </v-app>

  <v-container v-else>
    <Login></Login>
  </v-container>
</template>

<script>
import MsgComponent from "@/components/msgComponent";
import axios from "axios";

import Login from "@/views/Login";

export default {
  components: {Login, MsgComponent},
  data: () => (
      {
        kullanici: localStorage.getItem('user') || null,
        kullanici_img: localStorage.getItem('userimg') || null,

        drawer: null,

        items: [
          {title: 'Ana Sayfa', icon: 'mdi-home', to: '/'},
          {title: 'Cari Hesap', icon: 'mdi-account-cash', to: '/checkaccount'},
          {title: 'Risk Analiz', icon: 'mdi-database-edit', to: '/riskanalysis'},
        ],
      }),

  methods: {

    pushAdmin() {
      this.$router.push('/admin')
    },

    setAvatar() {
      if (this.kullanici !== null) {
        axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

        const AVATAR_API = "http://127.0.0.1:8000/appconfig/getavatar/" + this.kullanici
        console.log(AVATAR_API)
        const response = axios.get(AVATAR_API)
        console.log("avatar response : " + response)
        if (response.status === 200) {
          console.log("avatar response : " + response.data)
          this.kullanici_img = response.data
        }
      }
    },

    logout() {
      this.$store.commit("logout");
      this.kullanici = null;
      this.kullanici_img = null
    },

    getCredential() {
      const user = this.$store.commit("getCredentialstate")

      console.log("app page user : " + user)
      // console.log("local storage user : " + localStorage.getItem("user"))
      // console.log("app kullanici : " + this.kullanici)
      this.kullanici = user;
    }
  },


  mounted() {
    console.log("guard in app : " + this.$store.state.user)

    this.getCredential();
    this.setAvatar();
    console.log("App mounted !")
  },

}
</script>
