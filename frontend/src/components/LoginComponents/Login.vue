<template>
  <div class="vue-template" id="lgncls">
    <form>
      <h3>Giriş Yapın</h3>

      <div class="form-group">
        <v-text-field v-model="username"></v-text-field>
        <v-text-field v-model="password"></v-text-field>

        <button type="submit" class="btn btn-dark btn-lg btn-block" @click="loginfn">Giriş Yap</button>

        <p class="forgot-password text-right mt-2 mb-4">
          <router-link to="/forgetpwd">Şifremi Unuttum</router-link>
        </p>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    username: null,
    password: null
  }),

  methods: {
    loginfn() {
      console.log("usr : " + this.username)
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      })
    }
  }
}


</script>

<style>
#lgncls {
  background-color: wheat;
}
</style>
