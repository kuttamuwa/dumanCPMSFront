<template>
  <v-app id="inspire" v-if="logged === true">
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
      <v-card-title>{{kullanici}}</v-card-title>

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
// import CheckAccount from "@/views/CheckAccount";
// import RiskAnalysis from "@/views/RiskAnalysis";
// import Dashboard from "@/views/Dashboard";
// import LoginCard from "@/components/LoginComponents/LoginCard";
import Login from "@/components/LoginComponents/Login";

export default {
  components: {Login, MsgComponent},
  data: () => (
      {
        kullanici: localStorage.getItem('user'),
        kullanici_img: localStorage.getItem('userimg'),

        drawer: null,
        logged: localStorage.getItem("logged"),

        items: [
          {title: 'Ana Sayfa', icon: 'mdi-home', to: '/'},
          {title: 'Cari Hesap', icon: 'mdi-account-cash', to: '/checkaccount'},
          {title: 'Risk Analiz', icon: 'mdi-database-edit', to: '/riskanalysis'},
          {title: 'About', icon: 'mdi-help-box', to: '/about'},
          {title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard'},
          {title: 'Admin', icon: 'mdi-admin', to: '/admin'},
          {title: 'Login', icon: 'mdi-login', to: '/login'},
          {title: 'Logout', icon: 'mdi-logout', to: '/logout'},
          {title: 'Test', icon: 'mdi-test', to:'/test'}
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

  //   permCA() {
  //     if (CheckAccount.methods.getPerms() === false) {
  //       this.items = this.items.filter(function (i) {
  //         return i.title !== 'Cari Hesap'
  //       })
  //     }
  //   },
  //
  //   permRA() {
  //     if (RiskAnalysis.methods.getPerms() === false) {
  //       this.items = this.items.filter(function (i) {
  //         return i.title !== 'Risk Analiz'
  //       })
  //     }
  //   },
  //
  //   permDA() {
  //     if (Dashboard.methods.getPerms() === false) {
  //       this.items = this.items.filter(function (i) {
  //         return i.title !== 'Dashboard'
  //       })
  //     }
  //   },
  //
  //   setPermissions() {
  //     this.permCA();
  //     this.permRA();
  //     this.permDA();
  //   }
  },


  mounted() {
    console.log("App mounted !")

    // this.setPermissions();
    this.setAvatar();
  }
}
</script>
