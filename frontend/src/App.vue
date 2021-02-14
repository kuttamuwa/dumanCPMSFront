<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        dark
        v-if="logged_state === 'true'"
    >

      <v-img src="DUMANARGE.jpg"></v-img>
      <v-list>
        <v-list-item
            v-for="item in kullaniciBilgileri"
            :key="item.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

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

      <v-btn @click="cikisYap">
        <v-icon> mdi-logout</v-icon>
        Çıkış Yap
      </v-btn>
    </v-app-bar>

    <v-main>
      <msg-component/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MsgComponent from "@/components/msgComponent";
import axios from "axios";

import Login from "@/views/Login";
const ACCOUNT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/?format=json";

export default {
  components: {Login, MsgComponent},
  data: () => (
      {
        drawer: false,
        logged_state: false,

        items: [
          {title: 'Ana Sayfa', icon: 'mdi-home', to: '/'},
          {title: 'Cari Hesap', icon: 'mdi-account-cash', to: '/checkaccount'},
          {title: 'Risk Analiz', icon: 'mdi-database-edit', to: '/riskanalysis'},

        ],

        kullaniciBilgileri : [
          {title: null, avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        ]
      }),

  methods: {

    setKullaniciBilgileri(title, avatar) {
      this.kullaniciBilgileri = [{title: title, avatar: avatar}]
    },

    getLoggedState() {
      this.logged_state = this.$store.state.logged
    },

    clearCredential() {
      this.setKullaniciBilgileri(null, null)
      this.getLoggedState()
    },

    setTestCredential() {
      this.setKullaniciBilgileri("Test Kullanıcısı", "https://cdn.vuetifyjs.com/images/lists/2.jpg")
    },

    getCredentialUserInfo() {
      this.getLoggedState()
      if (this.logged_state !== "true") {
        this.$router.push({path: '/'})
      }

      let user = this.$store.state.user;
      let avatar = this.$store.state.userimg;

      console.log("get logged user : " + user)
      console.log("avatar : " + avatar)

      this.setKullaniciBilgileri(user, avatar)
    },

    cikisYap() {
      this.$store.dispatch("logout")
      this.clearCredential();

      this.$router.push({path: '/login'})
    },
  },


  mounted() {
    this.getCredentialUserInfo();
    // this.setTestCredential();
  },

}
</script>
