<template>

  <v-flex sm8 offset-sm2 v-if="currentUser === 'Dış Kullanıcı'">
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field v-model="userName" label="User Name" required/>
            </v-flex>

            <v-flex>
              <v-text-field v-model="password" label="Password" required/>
            </v-flex>
          </v-layout>
          <v-btn @click="login">Login</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
  <v-flex v-else>
    <v-card-text>Zaten giriş yapmıştınız</v-card-text>
    <v-btn @click="logout"> Çıkmak mı istiyorsunuz?</v-btn>
  </v-flex>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      userName: "",
      password: "",

      currentUser: ""
    }
  },

  methods: {
    async login() {
      console.log(this.userName);
      console.log(this.password);

      await this.$store.dispatch("login", {username: this.userName, password: this.password});

    },

    async logout() {
      await this.$store.dispatch("logoutserv")
      await this.$router.push('/')
    },

    setCurrentUser() {
      const usr = localStorage.getItem("user")
      if (usr === null) {
        this.currentUser = "Dış Kullanıcı"
      } else {
        this.currentUser = usr
      }
    }
  },

  mounted() {
    this.setCurrentUser();
    console.log("current user : " + this.currentUser)
  }
}
</script>
