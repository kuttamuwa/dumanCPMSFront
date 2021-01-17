<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        dark
        expand-on-hover
    >

      <v-img src="DUMANARGE.jpg"></v-img>

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
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => (
      {
        drawer: null,
        items: [
          {title: 'Ana Sayfa', icon: 'mdi-home', to: '/'},
          {title: 'Cari Hesap', icon: 'mdi-account-cash', to: '/checkaccount'},
          {title: 'Risk Analiz', icon: 'mdi-database-edit', to: '/riskanalysis'},
          {title: 'About', icon: 'mdi-help-box', to: '/about'},
          {title: 'Admin & Config', icon: 'mdi-cog-outline', to: '/appconfig'},

          {title: "Tests", icon: "mdi-test", to:'/tests'},
          {title: "Crud Test", icon: "mdi-test", to:'/PastCheckAccount'}
        ],
      }),
}
</script>
