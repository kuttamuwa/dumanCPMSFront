<template>

  <v-flex sm8 offset-sm2>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-layout>
            <v-flex>
              <v-text-field v-model="username" label="User Name" required/>
            </v-flex>

            <v-flex>
              <v-text-field v-model="password" label="Password" required/>
            </v-flex>
          </v-layout>
          <v-btn @click="loginfn">Login</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async loginfn() {
      console.log(this.username);
      console.log(this.password);

      const user = await this.$store.dispatch("login", {username: this.username, password: this.password});
      console.log("logged user : " + user)
      window.location.reload()
    },

    checkLoggedState() {
      let logstate = this.$store.state.logged
      console.log("log state : " + logstate)
      console.log("reload : " + this.reload)

      if (logstate === "true") {
        this.$store.commit('showmsg', {text: 'Zaten giriş yapmış durumdasınız', show: true})
        this.$router.push({path: '/'})
      }
    }
  },

  mounted() {
    this.checkLoggedState()

  }
}
</script>
